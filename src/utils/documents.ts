import type { Language } from '../context/LanguageContext';

const COMPANY_CARD_FILES: Record<Language, string> = {
  ru: 'LEV_AV_Company_Card_RU.pdf',
  en: 'LEV_AV_Company_Card_EN.pdf',
  hy: 'LEV_AV_Company_Card_HY.pdf',
};

const COMMERCIAL_PROPOSAL_FILES: Record<Language, string> = {
  ru: 'LEV_AV_Commercial_Proposal_RU.pdf',
  en: 'LEV_AV_Commercial_Proposal_EN.pdf',
  hy: 'LEV_AV_Commercial_Proposal_HY.pdf',
};

function downloadDocument(fileName: string) {
  const link = document.createElement('a');
  link.href = `${import.meta.env.BASE_URL}documents/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/** Downloads the official visual company profile card (PDF) in the given language. */
export function downloadCompanyCard(lang: Language) {
  downloadDocument(COMPANY_CARD_FILES[lang]);
}

/** Downloads the commercial proposal (PDF) in the given language. */
export function downloadCommercialProposal(lang: Language) {
  downloadDocument(COMMERCIAL_PROPOSAL_FILES[lang]);
}
