<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
    <div class="privacy-policy">
        <div class="policy-container">
            <!-- Header Section -->
            <div class="policy-header">
                <Icon icon="material-symbols:shield-lock-outline" class="policy-icon" />
                <h1 class="policy-title">Privacy Policy</h1>
                <p class="policy-subtitle">
                    We respect your privacy and are committed to protecting your personal data.
                </p>
                <div class="last-updated">
                    <span>Last updated: June 2025</span>
                </div>
            </div>

            <!-- Content Sections -->
            <div class="policy-content">
                
                <!-- Data Collection Section -->
                <section class="policy-section">
                    <div class="section-header">
                        <Icon icon="material-symbols:data-usage-outline" class="section-icon" />
                        <h2>Data We Collect</h2>
                    </div>
                    <div class="section-content">
                        <h3>Website Analytics</h3>
                        <p>
                            We use <strong>Umami</strong>, a privacy-focused website analytics platform, to help us understand how visitors use our website.
                        </p>
                        <ul>
                            <li>Umami does not use cookies</li>
                            <li>No personal data is collected</li>
                            <li>All analytics data is anonymized</li>
                            <li>Used solely for statistical purposes</li>
                        </ul>

                        <h3>Device Communication</h3>
                        <p>
                            When you use our web application to configure your Quickey macropad:
                        </p>
                        <ul>
                            <li>Device communication happens locally via WebSerial API</li>
                            <li>No configuration data is sent to our servers unless you save it as a preset</li>
                        </ul>
                    </div>
                </section>

                <!-- How We Use Data Section -->
                <section class="policy-section">
                    <div class="section-header">
                        <Icon icon="material-symbols:settings-applications-outline" class="section-icon" />
                        <h2>How We Use Your Data</h2>
                    </div>
                    <div class="section-content">
                        <p>The limited data we collect is used exclusively for:</p>
                        <ul>
                            <li>Understanding website usage patterns</li>
                            <li>Improving user experience</li>
                            <li>Technical performance monitoring</li>
                            <li>Identifying popular features</li>
                        </ul>
                        <div class="highlight-box">
                            <Icon icon="material-symbols:info-outline" class="highlight-icon" />
                            <p>
                                We never store your binding data on your servers unless you explicitly save it  .
                            </p>
                        </div>
                    </div>
                </section>

                <!-- Data Storage Section -->
                <section class="policy-section">
                    <div class="section-header">
                        <Icon icon="material-symbols:storage-rounded" class="section-icon" />
                        <h2>Data Storage & Processing</h2>
                    </div>
                    <div class="section-content">
                        <h3>Analytics Data</h3>
                        <p>
                            Analytics data is processed by Umami and hosted within the <strong>European Union (Germany)</strong>.
                        </p>

                        <h3>Local Storage</h3>
                        <p>
                            Your device configurations and preferences are stored locally in your browser using:
                        </p>
                        <ul>
                            <li><code>localStorage</code> - for app preferences and tutorial completion status</li>
                            <li><code>WebSerial API</code> - for direct device communication</li>
                        </ul>
                    </div>
                </section>

                <!-- Email Subscription Section -->
                <section class="policy-section">
                    <div class="section-header">
                        <Icon icon="material-symbols:mail-outline" class="section-icon" />
                        <h2>Email Subscriptions</h2>
                    </div>
                    <div class="section-content">
                        <p>
                            If you choose to subscribe to our updates via the "I am interested" button:
                        </p>
                        <ul>
                            <li>We collect only your email address</li>
                            <li>Used exclusively for product updates and announcements</li>
                        </ul>
                    </div>
                </section>

                <!-- Third Parties Section -->
                <section class="policy-section">
                    <div class="section-header">
                        <Icon icon="material-symbols:group-outline" class="section-icon" />
                        <h2>Third Party Services</h2>
                    </div>
                    <div class="section-content">
                        <div class="service-card">
                            <h3>Umami Analytics</h3>
                            <p>Privacy-focused, GDPR-compliant analytics</p>
                            <span class="service-location">🇩🇪 Hosted in Germany</span>
                        </div>
                        
                        <p class="no-sharing">
                            <Icon icon="material-symbols:block" class="no-icon" />
                            <strong>No data sharing:</strong> We do not share any information with advertising networks, data brokers, or other third parties.
                        </p>
                    </div>
                </section>

            </div>
        </div>
    </div>
</template>

<style scoped>
/* Also add this global override for the privacy policy page */
:global(#app:has(.privacy-policy)) {
    overflow-y: auto !important;
    overflow-x: hidden !important;
    align-items: flex-start !important;
}

.privacy-policy {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    margin-top: 80px;
    margin-bottom: 100px;
    padding: 0 20px;
}

.policy-container {
    max-width: 900px;
    width: 100%;
}

/* Header Styles */
.policy-header {
    text-align: center;
    margin-bottom: 50px;
}

.policy-icon {
    width: 80px;
    height: 80px;
    color: var(--primary-0);
    margin-bottom: 20px;
}

.policy-title {
    font-size: var(--big-title-text);
    color: var(--primary-0);
    margin-bottom: 15px;
    font-weight: bold;
}

.policy-subtitle {
    font-size: var(--bigger-text);
    color: var(--gray-bright);
    margin-bottom: 20px;
    line-height: 1.5;
}

.last-updated {
    display: inline-block;
    background: var(--primary-800);
    color: var(--primary-50);
    padding: 8px 16px;
    border-radius: var(--border-rad-main);
    font-size: var(--smaller-text);
    border: 1px solid var(--primary-600);
}

/* Content Styles */
.policy-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.policy-section {
    background: var(--primary-900);
    border: 1px solid var(--primary-600);
    border-radius: var(--border-rad-main);
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.section-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--primary-600);
}

.section-icon {
    width: 30px;
    height: 30px;
    color: var(--primary-50);
    margin-right: 12px;
}

.section-header h2 {
    font-size: var(--bigger-text);
    color: var(--primary-0);
    font-weight: bold;
    margin: 0;
}

.section-content h3 {
    color: var(--primary-50);
    font-size: var(--normal-text);
    margin: 20px 0 10px 0;
    font-weight: 600;
}

.section-content p {
    color: var(--gray-bright);
    line-height: 1.6;
    margin-bottom: 15px;
}

.section-content ul {
    margin: 15px 0;
    padding-left: 20px;
}

.section-content li {
    color: var(--gray-bright);
    margin-bottom: 8px;
    line-height: 1.5;
}

.section-content code {
    background: var(--primary-800);
    color: var(--primary-0);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: var(--smaller-text);
}

/* Highlight Box */
.highlight-box {
    display: flex;
    align-items: flex-start;
    background: var(--primary-800);
    border: 1px solid var(--green-dark);
    border-radius: var(--border-rad-smaller);
    padding: 15px;
    margin: 20px 0;
}

.highlight-icon {
    width: 24px;
    height: 24px;
    color: var(--green-bright);
    margin-right: 12px;
    margin-top: 2px;
    flex-shrink: 0;
}

.highlight-box p {
    margin: 0;
    color: var(--primary-0);
}

/* Service Card */
.service-card {
    background: var(--primary-800);
    border: 1px solid var(--primary-600);
    border-radius: var(--border-rad-smaller);
    padding: 20px;
    margin: 15px 0;
}

.service-card h3 {
    color: var(--primary-0);
    margin-top: 0;
}

.service-location {
    display: inline-block;
    background: var(--green-dark);
    color: var(--green-bright);
    padding: 4px 8px;
    border-radius: var(--border-rad-smaller);
    font-size: var(--smaller-text);
    margin-top: 10px;
}

.no-sharing {
    display: flex;
    align-items: center;
    background: var(--primary-800);
    border: 1px solid var(--red-dark);
    border-radius: var(--border-rad-smaller);
    padding: 15px;
    margin-top: 20px;
}

.no-icon {
    width: 24px;
    height: 24px;
    color: var(--red-vivid);
    margin-right: 12px;
}

/* Rights Grid */
.rights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.right-item {
    display: flex;
    align-items: center;
    background: var(--primary-800);
    border: 1px solid var(--primary-600);
    border-radius: var(--border-rad-smaller);
    padding: 15px;
}

.right-icon {
    width: 20px;
    height: 20px;
    color: var(--green-bright);
    margin-right: 10px;
}

/* Contact Section */
.contact-info {
    margin-top: 20px;
}

.contact-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background: var(--primary-800);
    border-radius: var(--border-rad-smaller);
}

.contact-icon {
    width: 20px;
    height: 20px;
    color: var(--primary-50);
    margin-right: 12px;
}

.contact-item a {
    color: var(--blue-vivid);
    text-decoration: none;
    transition: color 0.2s ease;
}

.contact-item a:hover {
    color: var(--primary-0);
    text-shadow: 0 0 10px var(--primary-0-shadow);
}

/* Responsive Design */
@media (max-width: 768px) {
    .privacy-policy {
        padding: 0 15px;
        margin-top: 60px;
    }
    
    .policy-title {
        font-size: 2.5rem;
    }
    
    .policy-icon {
        width: 60px;
        height: 60px;
    }
    
    .policy-section {
        padding: 20px;
    }
    
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    
    .section-icon {
        margin-bottom: 10px;
        margin-right: 0;
    }
    
    .rights-grid {
        grid-template-columns: 1fr;
    }
    
    .contact-item,
    .right-item {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    
    .contact-icon,
    .right-icon {
        margin-bottom: 8px;
        margin-right: 0;
    }
}

@media (max-width: 480px) {
    .policy-title {
        font-size: 2rem;
    }
    
    .policy-subtitle {
        font-size: var(--normal-text);
    }
    
    .section-header h2 {
        font-size: var(--normal-text);
    }
    
    .policy-section {
        padding: 15px;
    }
}
</style>