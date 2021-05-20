import { RouteColor } from "@typeDef/types";

type ColorToHex = {
  [key in RouteColor]: [string, string];
};
export const colorToHex: ColorToHex = {
  blue: ["#8EA4C8", "#26474E"],
  orange: ["#ffb347", "#e19529"],
  red: ["#ff6961", "#e16961"],
  black: ["#26474E", "#082930"],
  white: ["#fdfcfa", "#dfdedc"],
  green: ["#c3e2c3", "#a5c4a5"],
  yellow: ["#fde77d", "#dfc95f"],
  pink: ["#F9B1CD", "#DB93A5"],
  any: ["#dcdbd9", "#bebdbb"],
};

export const initialRoutes = {
  edin_lond_1: null,
  edin_lond_2: null,
  amst_lond_1: null,
  leha_lond_1: null,
  leha_lond_2: null,
  bres_leha_1: null,
  bres_pari_1: null,
  leha_pari_1: null,
  bres_pamp_1: null,
  pamp_pari_1: null,
  pamp_pari_2: null,
  brus_leha_1: null,
  amst_brus_1: null,
  brus_pari_1: null,
  brus_pari_2: null,
  amst_brem_1: null,
  brus_fran_1: null,
  amst_fran_1: null,
  fran_pari_1: null,
  fran_pari_2: null,
  fran_muni_1: null,
  brem_cope_1: null,
  brem_cope_2: null,
  cope_stoc_1: null,
  cope_stoc_2: null,
  mosc_stoc_1: null,
  mosc_riga_1: null,
  gdan_riga_1: null,
  mosc_voro_1: null,
  khar_voro_1: null,
  khar_kyiv_1: null,
  khar_rost_1: null,
  rost_seva_1: null,
  rost_soch_1: null,
  seva_soch_1: null,
  mosc_viln_1: null,
  riga_viln_1: null,
  viln_wars_1: null,
  kyiv_smol_1: null,
  kyiv_viln_1: null,
  viln_smol_1: null,
  smol_voro_1: null,
  kyiv_wars_1: null,
  gdan_wars_1: null,
  berl_gdan_1: null,
  berl_brem_1: null,
  brem_fran_1: null,
  madr_pamp_2: null,
  madr_pamp_1: null,
  lisb_madr_1: null,
  lisb_mala_1: null,
  madr_mala_1: null,
  barc_madr_1: null,
  barc_pamp_1: null,
  barc_mars_1: null,
  mars_pari_1: null,
  mars_pamp_1: null,
  pari_zuri_1: null,
  muni_zuri_1: null,
  muni_vien_1: null,
  muni_veni_1: null,
  mars_rome_1: null,
  veni_zagr_1: null,
  vien_zagr_1: null,
  veni_zuri_1: null,
  mars_zuri_1: null,
  rome_veni_1: null,
  berl_fran_1: null,
  berl_fran_2: null,
  pale_rome_1: null,
  bari_pale_1: null,
  athe_bari_1: null,
  berl_vien_1: null,
  bari_rome_1: null,
  berl_wars_1: null,
  berl_wars_2: null,
  vien_wars_1: null,
  sara_zagr_1: null,
  buda_vien_1: null,
  buda_vien_2: null,
  buda_kyiv_1: null,
  buch_kyiv_1: null,
  buch_buda_1: null,
  buch_seva_1: null,
  buda_sara_1: null,
  sara_sofi_1: null,
  buch_sofi_1: null,
  buda_zagr_1: null,
  erzu_seva_1: null,
  ista_seva_1: null,
  anka_ista_1: null,
  ista_izmi_1: null,
  athe_izmi_1: null,
  izmi_pale_1: null,
  athe_sara_1: null,
  athe_sofi_1: null,
  ista_sofi_1: null,
  buch_ista_1: null,
  anka_izmi_1: null,
  anka_erzu_1: null,
};
