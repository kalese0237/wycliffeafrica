/**
 * "Where to get Training" content — the SIL partner schools in Africa, exactly as supplied by
 * Wycliffe Africa.
 *
 * Institution names, programme titles and links are verbatim. Links point where Wycliffe Africa asked
 * them to point: mostly the institution's own site, and SIL's programme page for the two i-DELTA
 * entries. Language of instruction, intake dates, fees, entry requirements and programme length were
 * NOT supplied and are deliberately absent rather than inferred; the page sends the reader to the
 * school for those.
 */

export interface TrainingProgramme {
  /** The school. Where the source gave only a linked institution, this is the link text. */
  institution: string;
  /** The named programme, when the source distinguished it from the institution. */
  programme?: string;
  href: string;
  /** Verbatim parenthetical from the source, e.g. "Linguistics, Hebrew". */
  note?: string;
}

export interface TrainingCountry {
  /** Anchor id — the contents rail links to it. */
  id: string;
  country: string;
  programmes: TrainingProgramme[];
}

export const TRAINING_COUNTRIES: TrainingCountry[] = [
  {
    id: "cameroon",
    country: "Cameroon",
    programmes: [
      {
        institution: "Cameroon Baptist Theological Seminary",
        programme: "Bible Translation Studies at CBTS",
        href: "https://cbtsn.net/",
      },
      {
        institution: "Institut pour le Développement des Langues et de la Traduction en Afrique (i-DELTA)",
        href: "https://www.sil.org/program/idelta-fr",
      },
    ],
  },
  {
    id: "ivory-coast",
    country: "Ivory Coast",
    programmes: [
      {
        institution: "Université de l’Alliance Chrétienne d’Abidjan",
        programme: "La Filière Traduction à UACA",
        href: "https://uaca-fateac.org/",
      },
    ],
  },
  {
    id: "kenya",
    country: "Kenya",
    programmes: [
      {
        institution: "Africa International University",
        programme: "Translation Studies Programme at AIU",
        href: "https://www.aiu.ac.ke/",
      },
    ],
  },
  {
    id: "south-africa",
    country: "South Africa",
    programmes: [
      {
        institution: "University of the Free State",
        programme: "MA in Bible Translation Management",
        href: "https://www.ufs.ac.za/",
      },
      {
        institution: "Stellenbosch University",
        href: "https://www.su.ac.za/en",
        note: "Linguistics, Hebrew",
      },
    ],
  },
  {
    id: "uganda",
    country: "Uganda",
    programmes: [
      {
        institution: "Institute for the Development of Languages and Translation in Africa (i-DELTA)",
        href: "https://www.sil.org/program/idelta-en",
      },
    ],
  },
];

/** SIL's own index of training programmes, for readers whose search runs past this list. */
export const SIL_TRAINING_INDEX = "https://www.sil.org/training";

export const TRAINING_PROGRAMME_COUNT = TRAINING_COUNTRIES.reduce(
  (total, entry) => total + entry.programmes.length,
  0,
);
