import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Platform,
  PermissionsAndroid,
  Text,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { CHURCH_CENTER_BASE_URL, COLORS } from '../config';

// URL schemes that should never load inside the WebView.
// These are deep links to native apps or app store pages.
const BLOCKED_SCHEMES = [
  'itms-apps://',   // iOS App Store
  'market://',      // Google Play Store
  'intent://',      // Android intent links
];

// Domains that are allowed to load inside the WebView.
// Anything else opens in the system browser (or is blocked).
const ALLOWED_HOSTS = [
  'churchcenter.com',
  'planningcenteronline.com',
  'planningcenter.com',
  'give.planningcenteronline.com',
  'check-ins.planningcenteronline.com',
];

function isAllowedUrl(url) {
  if (!url) return false;
  // Always allow about:blank and blob: URLs
  if (url.startsWith('about:') || url.startsWith('blob:')) return true;
  // Block known app-store / deep-link schemes
  if (BLOCKED_SCHEMES.some((s) => url.startsWith(s))) return false;
  try {
    const host = new URL(url).hostname;
    return ALLOWED_HOSTS.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
  } catch {
    return true; // allow relative / unrecognised URLs to pass through
  }
}

export default function ChurchCenterScreen({ route }) {
  const { path = '/' } = route.params || {};
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const url = `${CHURCH_CENTER_BASE_URL}${path}`;

  // Handle Android hardware back button
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;

      const onBackPress = () => {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
          return true;
        }
        return false;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [canGoBack])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    setHasError(false);
    webViewRef.current?.reload();
  };

  const handleLoadEnd = () => {
    setLoading(false);
    setRefreshing(false);
  };

  const handleError = () => {
    setLoading(false);
    setRefreshing(false);
    setHasError(true);
  };

  // Android: grant camera permission when the WebView requests it (e.g. for QR scanning)
  const handleAndroidPermissionRequest = async (event) => {
    const { resources } = event.nativeEvent;
    if (!resources) return;

    const cameraResource = resources.find(
      (r) => r === PermissionsAndroid.PERMISSIONS.CAMERA || r.includes('VIDEO_CAPTURE')
    );

    if (cameraResource) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Camera access is needed to scan QR codes during check-in.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        event.nativeEvent.grant(resources);
      }
    }
  };

  // Prevent navigation to app stores or non-Planning Center domains
  const handleShouldStartLoad = (request) => {
    return isAllowedUrl(request.url);
  };

  if (hasError) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="wifi-outline" size={64} color={COLORS.tabBarInactive} />
        <Text style={styles.errorTitle}>Can't connect</Text>
        <Text style={styles.errorMessage}>
          Check your internet connection and try again.
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        style={styles.webview}
        onNavigationStateChange={(state) => setCanGoBack(state.canGoBack)}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        onHttpError={handleError}
        // Allow Church Center to detect this as a mobile app
        userAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        // Enable JS and DOM storage (required for login/session)
        javaScriptEnabled
        domStorageEnabled
        // Allow cookies to persist login sessions across tabs
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        // Cache for better performance
        cacheEnabled
        // Open target="_blank" links inside this WebView instead of system browser
        setSupportMultipleWindows={false}
        // Pull to refresh
        pullToRefreshEnabled
        onRefresh={handleRefresh}
        refreshing={refreshing}
        // Pinch to zoom
        scalesPageToFit={Platform.OS === 'android'}
        // Media / camera — required for QR code scanning in Check-In
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        // iOS: grant camera access without an extra OS-level prompt inside the WebView
        mediaCapturePermissionGrantType="grant"
        // Android: grant camera when the page requests it
        onPermissionRequest={handleAndroidPermissionRequest}
        // Block app-store redirects and deep links to native apps
        onShouldStartLoadWithRequest={handleShouldStartLoad}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.loadingBg,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.loadingBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: COLORS.loadingBg,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
  },
  errorMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
