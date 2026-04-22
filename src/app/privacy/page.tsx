import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Privacy Policy | Ethical Crypto',
  description: 'Learn how Ethical Crypto collects, protects, and manages your data in compliance with digital privacy standards.',
};

export default function PrivacyPolicy() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-void text-ghost">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Privacy Policy
        </h1>
        <p className="opacity-50 text-sm font-bold">Effective Date: April 2026</p>
      </header>
      <div className="prose prose-slate max-w-none space-y-6 text-dim leading-relaxed">
        <p>At Ethical Crypto, accessible from ethicalcrypto.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ethical Crypto and how we use it.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Information We Collect</h2>
        <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
        <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Log Files</h2>
        <p>Ethical Crypto follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Cookies and Web Beacons</h2>
        <p>Like any other website, Ethical Crypto uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
        <p>For more detailed information on the cookies we use, please read our <a href="/cookie-policy" className="text-black underline font-bold">Cookie Policy</a>.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">GDPR Data Protection Rights</h2>
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Children's Information</h2>
        <p>Another part of our priority is adding protection for children while using the internet. Ethical Crypto does not knowingly collect any Personal Identifiable Information from children under the age of 13.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Consent</h2>
        <p>By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
      </div>
    </article>
  );
}
