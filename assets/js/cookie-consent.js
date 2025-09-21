/**
 * Ottawa Handiman Cookie Consent Manager
 * Manages Google Analytics cookies with user consent
 */

(function() {
    'use strict';

    // Configuration
    const CONSENT_COOKIE_NAME = 'ottawa_handiman_cookie_consent';
    const CONSENT_COOKIE_DAYS = 365;
    const GA_MEASUREMENT_ID = 'G-2KNZ3Z35FV';

    // Cookie consent states
    const CONSENT_STATES = {
        ACCEPTED: 'accepted',
        REJECTED: 'rejected',
        PENDING: 'pending'
    };

    /**
     * Cookie utility functions
     */
    const CookieUtils = {
        set: function(name, value, days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            const expires = `expires=${date.toUTCString()}`;
            document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
        },

        get: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        delete: function(name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
        },

        deleteAll: function() {
            // Delete all cookies except our consent cookie
            document.cookie.split(";").forEach(function(c) {
                const eqPos = c.indexOf("=");
                const name = eqPos > -1 ? c.substr(0, eqPos).trim() : c.trim();
                if (name && name !== CONSENT_COOKIE_NAME) {
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=${window.location.hostname};`;
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;domain=.${window.location.hostname};`;
                }
            });
        }
    };

    /**
     * Google Analytics Manager
     */
    const GoogleAnalytics = {
        initialize: function() {
            // Only initialize if not already done
            if (typeof gtag === 'undefined') {
                window.dataLayer = window.dataLayer || [];
                window.gtag = function() { window.dataLayer.push(arguments); };
                gtag('js', new Date());
            }

            // Configure GA with cookie consent granted
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });

            gtag('config', GA_MEASUREMENT_ID, {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=Lax;Secure'
            });

            console.log('Google Analytics initialized with consent');
        },

        disable: function() {
            // Disable GA and delete GA cookies
            window['ga-disable-' + GA_MEASUREMENT_ID] = true;

            // Configure GA with cookie consent denied
            if (typeof gtag !== 'undefined') {
                gtag('consent', 'update', {
                    'analytics_storage': 'denied'
                });
            }

            // Delete GA cookies
            const gaCookies = ['_ga', '_gid', '_gat', '_ga_' + GA_MEASUREMENT_ID.replace('G-', '')];
            gaCookies.forEach(cookie => {
                CookieUtils.delete(cookie);
                CookieUtils.delete(cookie + '_' + GA_MEASUREMENT_ID);
            });

            console.log('Google Analytics disabled and cookies deleted');
        }
    };

    /**
     * Cookie Consent Banner Manager
     */
    const ConsentBanner = {
        create: function() {
            const banner = document.createElement('div');
            banner.id = 'cookie-consent-banner';
            banner.innerHTML = `
                <div class="cookie-consent-content">
                    <div class="cookie-consent-text">
                        <h3>🍪 Cookie Notice</h3>
                        <p>We use cookies to analyze site traffic and improve your experience.
                        Google Analytics helps us understand how visitors use our site.
                        Your data is anonymous and never sold.</p>
                        <a href="#" id="cookie-details-link">Learn more about cookies</a>
                    </div>
                    <div class="cookie-consent-buttons">
                        <button id="cookie-reject" class="cookie-btn cookie-btn-secondary">Reject All</button>
                        <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Accept Cookies</button>
                    </div>
                </div>
                <div id="cookie-details" class="cookie-details" style="display: none;">
                    <h4>Cookie Details</h4>
                    <p><strong>Essential Cookies:</strong> Required for the website to function. These include:</p>
                    <ul>
                        <li>Cookie consent preference (1 year)</li>
                        <li>Service worker for offline functionality</li>
                    </ul>
                    <p><strong>Analytics Cookies (Google Analytics):</strong> Help us understand how visitors use our site:</p>
                    <ul>
                        <li>_ga: Distinguishes unique users (2 years)</li>
                        <li>_gid: Distinguishes unique users (24 hours)</li>
                        <li>_ga_*: Used to persist session state (2 years)</li>
                    </ul>
                    <p>We never collect personal information or sell your data. Analytics are used solely to improve our services.</p>
                    <button id="cookie-manage" class="cookie-btn cookie-btn-secondary">Manage Preferences</button>
                </div>
            `;

            // Add styles
            const styles = `
                <style>
                #cookie-consent-banner {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: white;
                    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    z-index: 999999;
                    animation: slideUp 0.3s ease-out;
                    border-top: 3px solid #2d5f3f;
                }

                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .cookie-consent-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 30px;
                    flex-wrap: wrap;
                }

                .cookie-consent-text {
                    flex: 1;
                    min-width: 300px;
                }

                .cookie-consent-text h3 {
                    margin: 0 0 10px 0;
                    color: #2d5f3f;
                    font-size: 20px;
                    font-weight: 600;
                }

                .cookie-consent-text p {
                    margin: 0 0 10px 0;
                    color: #333;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .cookie-consent-text a {
                    color: #2d5f3f;
                    text-decoration: underline;
                    font-size: 14px;
                    cursor: pointer;
                }

                .cookie-consent-text a:hover {
                    color: #1a3625;
                }

                .cookie-consent-buttons {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .cookie-btn {
                    padding: 12px 24px;
                    border: none;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .cookie-btn-primary {
                    background: #2d5f3f;
                    color: white;
                }

                .cookie-btn-primary:hover {
                    background: #1a3625;
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(45, 95, 63, 0.3);
                }

                .cookie-btn-secondary {
                    background: #f0f0f0;
                    color: #333;
                }

                .cookie-btn-secondary:hover {
                    background: #e0e0e0;
                }

                .cookie-details {
                    max-width: 1200px;
                    margin: 20px auto 0;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 8px;
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .cookie-details h4 {
                    margin: 0 0 15px 0;
                    color: #2d5f3f;
                    font-size: 18px;
                }

                .cookie-details p {
                    margin: 10px 0;
                    color: #555;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .cookie-details ul {
                    margin: 5px 0 15px 20px;
                    color: #666;
                    font-size: 13px;
                    line-height: 1.6;
                }

                #cookie-manage {
                    margin-top: 15px;
                }

                @media (max-width: 768px) {
                    .cookie-consent-content {
                        flex-direction: column;
                        align-items: stretch;
                    }

                    .cookie-consent-buttons {
                        justify-content: stretch;
                        flex-direction: column;
                    }

                    .cookie-btn {
                        width: 100%;
                    }
                }

                /* Settings Modal */
                .cookie-settings-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }

                .cookie-settings-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    padding: 30px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                }

                .cookie-settings-content h3 {
                    margin: 0 0 20px 0;
                    color: #2d5f3f;
                }

                .cookie-setting-item {
                    border-bottom: 1px solid #eee;
                    padding: 20px 0;
                }

                .cookie-setting-item:last-child {
                    border-bottom: none;
                }

                .cookie-setting-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;
                }

                .cookie-setting-title {
                    font-weight: 600;
                    color: #333;
                }

                .cookie-switch {
                    position: relative;
                    width: 50px;
                    height: 26px;
                }

                .cookie-switch input {
                    display: none;
                }

                .cookie-switch-slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: #ccc;
                    border-radius: 26px;
                    transition: 0.3s;
                }

                .cookie-switch-slider:before {
                    position: absolute;
                    content: "";
                    height: 20px;
                    width: 20px;
                    left: 3px;
                    bottom: 3px;
                    background: white;
                    border-radius: 50%;
                    transition: 0.3s;
                }

                .cookie-switch input:checked + .cookie-switch-slider {
                    background: #2d5f3f;
                }

                .cookie-switch input:disabled + .cookie-switch-slider {
                    opacity: 0.5;
                    cursor: not-allowed;
                }

                .cookie-switch input:checked + .cookie-switch-slider:before {
                    transform: translateX(24px);
                }

                .cookie-setting-description {
                    color: #666;
                    font-size: 14px;
                    line-height: 1.5;
                }

                .cookie-settings-buttons {
                    display: flex;
                    gap: 15px;
                    margin-top: 25px;
                    justify-content: flex-end;
                }
                </style>
            `;

            document.head.insertAdjacentHTML('beforeend', styles);
            document.body.appendChild(banner);

            // Attach event listeners
            this.attachEventListeners();
        },

        attachEventListeners: function() {
            // Accept button
            document.getElementById('cookie-accept').addEventListener('click', function() {
                ConsentManager.acceptCookies();
            });

            // Reject button
            document.getElementById('cookie-reject').addEventListener('click', function() {
                ConsentManager.rejectCookies();
            });

            // Details link
            document.getElementById('cookie-details-link').addEventListener('click', function(e) {
                e.preventDefault();
                const details = document.getElementById('cookie-details');
                details.style.display = details.style.display === 'none' ? 'block' : 'none';
            });

            // Manage preferences button
            const manageBtn = document.getElementById('cookie-manage');
            if (manageBtn) {
                manageBtn.addEventListener('click', function() {
                    ConsentManager.showSettings();
                });
            }
        },

        hide: function() {
            const banner = document.getElementById('cookie-consent-banner');
            if (banner) {
                banner.style.animation = 'slideDown 0.3s ease-out';
                setTimeout(() => {
                    banner.remove();
                }, 300);
            }
        }
    };

    /**
     * Main Consent Manager
     */
    const ConsentManager = {
        init: function() {
            // Check if consent has been given
            const consent = CookieUtils.get(CONSENT_COOKIE_NAME);

            if (!consent) {
                // No consent yet, show banner and prevent GA from loading
                this.showBanner();
                // Set default consent state to denied
                if (typeof gtag !== 'undefined') {
                    gtag('consent', 'default', {
                        'analytics_storage': 'denied'
                    });
                }
            } else if (consent === CONSENT_STATES.ACCEPTED) {
                // Consent given, initialize GA
                GoogleAnalytics.initialize();
            } else if (consent === CONSENT_STATES.REJECTED) {
                // Consent rejected, ensure GA is disabled
                GoogleAnalytics.disable();
            }
        },

        showBanner: function() {
            ConsentBanner.create();
        },

        acceptCookies: function() {
            CookieUtils.set(CONSENT_COOKIE_NAME, CONSENT_STATES.ACCEPTED, CONSENT_COOKIE_DAYS);
            GoogleAnalytics.initialize();
            ConsentBanner.hide();
            console.log('Cookies accepted');
        },

        rejectCookies: function() {
            CookieUtils.set(CONSENT_COOKIE_NAME, CONSENT_STATES.REJECTED, CONSENT_COOKIE_DAYS);
            GoogleAnalytics.disable();
            CookieUtils.deleteAll();
            ConsentBanner.hide();
            console.log('Cookies rejected');
        },

        showSettings: function() {
            // Create settings modal
            const modal = document.createElement('div');
            modal.className = 'cookie-settings-modal';
            modal.innerHTML = `
                <div class="cookie-settings-content">
                    <h3>Cookie Preferences</h3>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-header">
                            <span class="cookie-setting-title">Essential Cookies</span>
                            <label class="cookie-switch">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-switch-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-setting-description">
                            Required for the website to function properly. These cannot be disabled.
                        </p>
                    </div>

                    <div class="cookie-setting-item">
                        <div class="cookie-setting-header">
                            <span class="cookie-setting-title">Analytics Cookies</span>
                            <label class="cookie-switch">
                                <input type="checkbox" id="analytics-toggle" ${CookieUtils.get(CONSENT_COOKIE_NAME) === CONSENT_STATES.ACCEPTED ? 'checked' : ''}>
                                <span class="cookie-switch-slider"></span>
                            </label>
                        </div>
                        <p class="cookie-setting-description">
                            Help us understand how visitors use our website through Google Analytics.
                            All data is anonymous and used solely to improve our services.
                        </p>
                    </div>

                    <div class="cookie-settings-buttons">
                        <button class="cookie-btn cookie-btn-secondary" id="settings-cancel">Cancel</button>
                        <button class="cookie-btn cookie-btn-primary" id="settings-save">Save Preferences</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Event listeners for modal
            document.getElementById('settings-cancel').addEventListener('click', function() {
                modal.remove();
            });

            document.getElementById('settings-save').addEventListener('click', function() {
                const analyticsEnabled = document.getElementById('analytics-toggle').checked;

                if (analyticsEnabled) {
                    ConsentManager.acceptCookies();
                } else {
                    ConsentManager.rejectCookies();
                }

                modal.remove();
            });

            // Close on background click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        },

        // Public method to reset consent (for footer link)
        resetConsent: function() {
            CookieUtils.delete(CONSENT_COOKIE_NAME);
            CookieUtils.deleteAll();
            location.reload();
        }
    };

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            ConsentManager.init();
        });
    } else {
        ConsentManager.init();
    }

    // Expose public methods
    window.CookieConsent = {
        reset: ConsentManager.resetConsent,
        showSettings: ConsentManager.showSettings
    };

})();