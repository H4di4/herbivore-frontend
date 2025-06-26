import React, { useState } from 'react';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert(t('contacts.validationError'));
      return;
    }
    setSubmitting(true);
    setSuccess(null);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSuccess(t('contacts.success'));
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      alert(t('contacts.error'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-3xl font-normal m-16">{t('contacts.title')}</h1>
        <p className="font-bold text-[15px] mb-6">{t('contacts.orderStatus')}</p>
        <p className="text-[14px]">{t('contacts.spamNotice')}</p>
        <p className="font-bold text-[15px] mt-6">{t('contacts.emailPrompt')}</p>
        <p className="text-black text-[14px] mb-6">{t('contacts.responseTime')}</p>

        <div className="mt-4 tracking-tighter space-y-6 p-6">
          <p><strong>{t('contacts.generalLabel')}:</strong> <a href={`mailto:${t('contacts.generalEmail')}`} className="text-stone-700 underline">{t('contact.generalEmail')}</a></p>
          <p><strong>{t('contacts.pressLabel')}:</strong> <a href={`mailto:${t('contacts.pressEmail')}`} className="text-stone-700 underline">{t('contact.pressEmail')}</a></p>
          <p><strong>{t('contacts.wholesaleLabel')}:</strong> <a href={`mailto:${t('contacts.wholesaleEmail')}`} className="text-stone-700 underline">{t('contact.wholesaleEmail')}</a></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mb-10">
          <div className="flex gap-4">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              className="w-[50%] border border-gray-300 px-3 py-2 focus:outline-none"
              placeholder={t('contacts.namePlaceholder')}
              required
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-[50%] border border-gray-300 px-3 py-2 focus:outline-none"
              placeholder={t('contacts.emailPlaceholder')}
              required
            />
          </div>
          <div>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-6 focus:outline-none"
              placeholder={t('contacts.messagePlaceholder')}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-[rgb(59,59,59)] text-white tracking-wide py-3 px-6 w-full transition font-thin disabled:opacity-50"
          >
            {submitting ? t('contacts.sending') : t('contacts.sendMessage')}
          </button>
          {success && <p className="text-green-600 font-medium">{success}</p>}
        </form>
      </div>

      <div className="pt-12">
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
