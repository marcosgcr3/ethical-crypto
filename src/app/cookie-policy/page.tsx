import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Cookie Policy | Ethical Crypto',
  description: 'Detailed information about how Ethical Crypto uses cookies and similar technologies to enhance your protocol research experience.',
};

export default function CookiePolicy() {
  return (
    <article className="container mx-auto px-6 py-24 max-w-4xl bg-void text-ghost">
      <header className="mb-12 border-b border-black/10 pb-8">
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-black uppercase tracking-tighter mb-4">
          Cookie Policy
        </h1>
        <p className="opacity-50 text-sm font-bold">Effective Date: April 2026</p>
      </header>
      <div className="prose prose-slate max-w-none space-y-6 text-dim leading-relaxed">
        <p>This is the Cookie Policy for Ethical Crypto, accessible from ethicalcrypto.com.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">What Are Cookies</h2>
        <p>As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">How We Use Cookies</h2>
        <p>We use cookies for a variety of reasons detailed below. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">The Cookies We Set</h2>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <strong>Forms related cookies</strong>
                <p>When you submit data through a form such as those found on contact pages, cookies may be set to remember your user details for future correspondence.</p>
            </li>
            <li>
                <strong>Site preferences cookies</strong>
                <p>In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs. We need to set cookies so that this information can be called whenever you interact with a page.</p>
            </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Third Party Cookies</h2>
        <p>In some special cases we also use cookies provided by trusted third parties.</p>
        <ul className="list-disc pl-6 space-y-2">
            <li>
                <p>This site uses Google Analytics for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit.</p>
            </li>
            <li>
                <p>The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.</p>
            </li>
        </ul>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">Disabling Cookies</h2>
        <p>You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit.</p>

        <h2 className="font-heading text-2xl font-bold mt-8 mb-4 text-black uppercase tracking-tight">More Information</h2>
        <p>Hopefully that has clarified things for you. However if you are still looking for more information then you can contact us through our <a href="/contact" className="text-black underline font-bold">Contact Page</a>.</p>
      </div>
    </article>
  );
}
