import React, { useEffect, useState } from 'react';
import logo from "../assets/header.jpg";
import axios from "axios";
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const [socialLinks, setSocialLinks] = useState({});

  // Fetch social media links on mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/social-links') // API endpoint for social URLs
      .then((res) => setSocialLinks(res.data))
      .catch((err) => console.error("Error fetching social links", err));
  }, []);

  return (
    <footer className="bg-white mt-10 text-black py-12 px-2 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

        {/* Logo, tagline, and social media icons */}
        <div className="flex flex-col items-start mr-8">
          <img src={logo} alt="Logo" className="mb-2 w-56" />
          <h3 className="text-gray-900 mb-4">{t('footer.tagline')}</h3>

          {/* Render social icons only if links exist */}
          <div className="flex space-x-4 mt-2">
            {socialLinks.facebook && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-7 h-7 opacity-70 hover:opacity-100 hover:stroke-black" />
              </a>
            )}
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-7 h-7 opacity-70 hover:opacity-100 stroke-black" />
              </a>
            )}
            {socialLinks.youtube && (
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="w-7 h-7 stroke-black opacity-70 hover:opacity-100" />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-7 h-7 stroke-black opacity-70 hover:opacity-100" />
              </a>
            )}
          </div>
        </div>

        {/* SHOP Section with navigation links */}
        <div className='ml-16'>
          <h4 className="text-gray-900 mb-4 text-[14px]">{t('footer.sections.shop')}</h4>
          <ul className="space-y-2 text-sm leading-7">
            <li><a href="/skincare">{t('footer.sections.shopLinks.shopAll')}</a></li>
            <li><a href="/skincare/bestsellers">{t('footer.sections.shopLinks.bestsellers')}</a></li>
            <li><a href="/skincare">{t('footer.sections.shopLinks.skincare')}</a></li>
            <li><a href="/skincare/bath-body">{t('footer.sections.shopLinks.bathBody')}</a></li>
            <li><a href="/skincare/sets">{t('footer.sections.shopLinks.setsBundles')}</a></li>
          </ul>
        </div>

        {/* ABOUT Section */}
        <div>
          <h4 className="text-gray-900 mb-4 text-[14px]">{t('footer.sections.about')}</h4>
          <ul className="space-y-2 text-sm leading-7">
            <li><a href="/about">{t('footer.sections.aboutLinks.aboutUs')}</a></li>
            <li><a href="/blog/news">{t('footer.sections.aboutLinks.blog')}</a></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE Section */}
        <div>
          <h4 className="text-gray-900 mb-4 text-[14px]">{t('footer.sections.customerService')}</h4>
          <ul className="space-y-2 text-sm leading-7">
            <li><a href="/faq">{t('footer.sections.customerLinks.faqs')}</a></li>
            <li><a href="#">{t('footer.sections.customerLinks.returns')}</a></li>
            <li><a href="/contact">{t('footer.sections.customerLinks.contact')}</a></li>
          </ul>
        </div>

        {/* ACCOUNT Section */}
        <div>
          <h4 className="text-gray-900 mb-4 text-[14px]">{t('footer.sections.account')}</h4>
          <ul className="space-y-2 text-sm list-none">
            <li><a href="/login">{t('footer.sections.accountLinks.myAccount')}</a></li>
          </ul>
        </div>
      </div>

      {/* Legal info and links */}
      <div className="mt-20 pt-2 flex flex-col justify-between uppercase text-xs leading-6 text-black max-w-7xl mx-auto px-0">
        <div className="w-full pl-0 text-left">
          <span>{t('footer.legal.copyright')}</span>
          <br />
          <a href="#">{t('footer.legal.privacyPolicy')}</a>
          <span className="mx-2">·</span>
          <a href="#">{t('footer.legal.termsOfService')}</a>
          <span className="mx-2">·</span>
          <a href="#">{t('footer.legal.accessibility')}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
