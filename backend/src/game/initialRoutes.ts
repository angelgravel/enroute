import { GameRoutes } from "@typeDef/types";

const initialRoutes: GameRoutes = {
  edin_lond_1: { builtBy: null, color: "orange", bridges: 0, length: 4 },
  edin_lond_2: { builtBy: null, color: "black", bridges: 0, length: 4 },
  amst_lond_1: { builtBy: null, color: "any", bridges: 2, length: 2 },
  leha_lond_1: { builtBy: null, color: "any", bridges: 1, length: 2 },
  leha_lond_2: { builtBy: null, color: "any", bridges: 1, length: 2 },
  bres_leha_1: { builtBy: null, color: "orange", bridges: 0, length: 2 },
  bres_pari_1: { builtBy: null, color: "black", bridges: 0, length: 3 },
  leha_pari_1: { builtBy: null, color: "pink", bridges: 0, length: 1 },
  bres_pamp_1: { builtBy: null, color: "pink", bridges: 0, length: 4 },
  pamp_pari_1: { builtBy: null, color: "blue", bridges: 0, length: 4 },
  pamp_pari_2: { builtBy: null, color: "green", bridges: 0, length: 4 },
  brus_leha_1: { builtBy: null, color: "green", bridges: 0, length: 2 },
  amst_brus_1: { builtBy: null, color: "black", bridges: 0, length: 1 },
  brus_pari_1: { builtBy: null, color: "yellow", bridges: 0, length: 2 },
  brus_pari_2: { builtBy: null, color: "red", bridges: 0, length: 2 },
  amst_brem_1: { builtBy: null, color: "yellow", bridges: 0, length: 3 },
  brus_fran_1: { builtBy: null, color: "blue", bridges: 0, length: 2 },
  amst_fran_1: { builtBy: null, color: "white", bridges: 0, length: 2 },
  fran_pari_1: { builtBy: null, color: "white", bridges: 0, length: 3 },
  fran_pari_2: { builtBy: null, color: "orange", bridges: 0, length: 3 },
  fran_muni_1: { builtBy: null, color: "pink", bridges: 0, length: 2 },
  brem_cope_1: { builtBy: null, color: "any", bridges: 1, length: 3 },
  brem_cope_2: { builtBy: null, color: "any", bridges: 1, length: 3 },
  cope_stoc_1: { builtBy: null, color: "yellow", bridges: 0, length: 3 },
  cope_stoc_2: { builtBy: null, color: "white", bridges: 0, length: 3 },
  mosc_stoc_1: { builtBy: null, color: "any", bridges: 0, length: 8 },
  mosc_riga_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  gdan_riga_1: { builtBy: null, color: "black", bridges: 0, length: 3 },
  mosc_voro_1: { builtBy: null, color: "white", bridges: 0, length: 4 },
  khar_voro_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  khar_kyiv_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  khar_rost_1: { builtBy: null, color: "green", bridges: 0, length: 2 },
  rost_seva_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  rost_soch_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  seva_soch_1: { builtBy: null, color: "any", bridges: 1, length: 2 },
  mosc_viln_1: { builtBy: null, color: "blue", bridges: 0, length: 4 },
  riga_viln_1: { builtBy: null, color: "green", bridges: 0, length: 4 },
  viln_wars_1: { builtBy: null, color: "red", bridges: 0, length: 3 },
  kyiv_smol_1: { builtBy: null, color: "red", bridges: 0, length: 3 },
  kyiv_viln_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  viln_smol_1: { builtBy: null, color: "yellow", bridges: 0, length: 3 },
  smol_voro_1: { builtBy: null, color: "orange", bridges: 0, length: 2 },
  kyiv_wars_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  gdan_wars_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  berl_gdan_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  berl_brem_1: { builtBy: null, color: "blue", bridges: 0, length: 2 },
  brem_fran_1: { builtBy: null, color: "green", bridges: 0, length: 2 },
  madr_pamp_2: { builtBy: null, color: "black", bridges: 0, length: 3 },
  madr_pamp_1: { builtBy: null, color: "white", bridges: 0, length: 3 },
  lisb_madr_1: { builtBy: null, color: "pink", bridges: 0, length: 3 },
  lisb_mala_1: { builtBy: null, color: "blue", bridges: 0, length: 2 },
  madr_mala_1: { builtBy: null, color: "orange", bridges: 0, length: 3 },
  barc_madr_1: { builtBy: null, color: "yellow", bridges: 0, length: 2 },
  barc_pamp_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  barc_mars_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  mars_pari_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  mars_pamp_1: { builtBy: null, color: "red", bridges: 0, length: 4 },
  pari_zuri_1: { builtBy: null, color: "any", bridges: 0, length: 3 },
  muni_zuri_1: { builtBy: null, color: "yellow", bridges: 0, length: 2 },
  muni_vien_1: { builtBy: null, color: "orange", bridges: 0, length: 3 },
  muni_veni_1: { builtBy: null, color: "blue", bridges: 0, length: 2 },
  mars_rome_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  veni_zagr_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  vien_zagr_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  veni_zuri_1: { builtBy: null, color: "green", bridges: 0, length: 2 },
  mars_zuri_1: { builtBy: null, color: "pink", bridges: 0, length: 2 },
  rome_veni_1: { builtBy: null, color: "black", bridges: 0, length: 2 },
  berl_fran_1: { builtBy: null, color: "black", bridges: 0, length: 3 },
  berl_fran_2: { builtBy: null, color: "red", bridges: 0, length: 3 },
  pale_rome_1: { builtBy: null, color: "any", bridges: 1, length: 4 },
  bari_pale_1: { builtBy: null, color: "any", bridges: 1, length: 3 },
  athe_bari_1: { builtBy: null, color: "any", bridges: 1, length: 4 },
  berl_vien_1: { builtBy: null, color: "green", bridges: 0, length: 3 },
  bari_rome_1: { builtBy: null, color: "white", bridges: 0, length: 2 },
  berl_wars_1: { builtBy: null, color: "pink", bridges: 0, length: 4 },
  berl_wars_2: { builtBy: null, color: "yellow", bridges: 0, length: 4 },
  vien_wars_1: { builtBy: null, color: "blue", bridges: 0, length: 4 },
  sara_zagr_1: { builtBy: null, color: "red", bridges: 0, length: 3 },
  buda_vien_1: { builtBy: null, color: "red", bridges: 0, length: 1 },
  buda_vien_2: { builtBy: null, color: "white", bridges: 0, length: 1 },
  buda_kyiv_1: { builtBy: null, color: "any", bridges: 0, length: 6 },
  buch_kyiv_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  buch_buda_1: { builtBy: null, color: "any", bridges: 0, length: 4 },
  buch_seva_1: { builtBy: null, color: "white", bridges: 0, length: 4 },
  buda_sara_1: { builtBy: null, color: "pink", bridges: 0, length: 3 },
  sara_sofi_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  buch_sofi_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  buda_zagr_1: { builtBy: null, color: "orange", bridges: 0, length: 2 },
  erzu_seva_1: { builtBy: null, color: "any", bridges: 2, length: 4 },
  ista_seva_1: { builtBy: null, color: "any", bridges: 2, length: 4 },
  anka_ista_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  ista_izmi_1: { builtBy: null, color: "any", bridges: 0, length: 2 },
  athe_izmi_1: { builtBy: null, color: "any", bridges: 1, length: 2 },
  izmi_pale_1: { builtBy: null, color: "any", bridges: 2, length: 6 },
  athe_sara_1: { builtBy: null, color: "green", bridges: 0, length: 4 },
  athe_sofi_1: { builtBy: null, color: "pink", bridges: 0, length: 3 },
  ista_sofi_1: { builtBy: null, color: "blue", bridges: 0, length: 3 },
  buch_ista_1: { builtBy: null, color: "yellow", bridges: 0, length: 3 },
  anka_izmi_1: { builtBy: null, color: "orange", bridges: 0, length: 3 },
  anka_erzu_1: { builtBy: null, color: "black", bridges: 0, length: 3 },
};

export default initialRoutes;
