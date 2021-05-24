import { motion } from "framer-motion";
import React, { FC } from "react";
import styled from "styled-components";

import BasicCard from "../BasicCard";

const TicketBackWrapper = styled.svg`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.g`
  clip-path: url(#ticket_back_clipPath_1);
`;

const BackgroundRect = styled.rect`
  fill: #fde9e4;
`;

const BackgroundPath = styled.path`
  fill: #f7f6f8;
`;

const MapWrapper = styled.g`
  clip-path: url(#ticket_back_clipPath_2);
`;

const MapBackgroundRect = styled.rect`
  fill: #a4d8df;
  stroke: #000;
  stroke-width: 0.5px;
  stroke-miterlimit: 10;
`;

const MapBackgroundPath = styled.path`
  fill: #6c8e6d;
  stroke: #0c2327;
  stroke-width: 0.5px;
  stroke-miterlimit: 10;
`;

const MapBackgroundBorder = styled.path`
  fill: none;
  stroke: #0d2327;
  stroke-width: 0.5px;
  stroke-miterlimit: 10;
`;

const Overlay = styled.rect`
  fill: #fff;
  stroke: #f7f6f8;
  opacity: 0.78;
  stroke-width: 2px;
  stroke-miterlimit: 10;
`;

const TextWrapper = styled.rect`
  stroke: #e5e5e8;
  stroke-width: 2px;
  stroke-miterlimit: 10;
  fill: #fde9e4;
`;

const Text = styled.text`
  font-size: 60px;
  fill: #656564;
  font-family: AmaticSC-Bold, Amatic SC;
  font-weight: 700;
  user-select: none;
`;
type TicketBackProps = {
  style?: React.CSSProperties;
};
const TicketBack: FC<TicketBackProps> = ({ style = {} }) => {
  return (
    <BasicCard style={style} rotate={false} hoverable interactable raised>
      <TicketBackWrapper
        xmlns="http://www.w3.org/2000/svg"
        viewBox={"0 0 171.07874 256.11811"}
      >
        <clipPath id="ticket_back_clipPath_1">
          <rect
            fill="none"
            x="-42.51969"
            y="42.61348"
            width="256.11811"
            height="170.89116"
            transform="translate(-42.51969 213.59843) rotate(-90)"
          />
        </clipPath>
        <clipPath id="ticket_back_clipPath_2">
          <rect
            fill="none"
            x="18.91081"
            y="23.83853"
            width="134.4281"
            height="209.06432"
          />
        </clipPath>

        <Wrapper>
          <BackgroundRect
            x="10.03186"
            y="10.85418"
            width="151.82743"
            height="234.40975"
          />
          <BackgroundPath d="M153.339,23.83853V232.90284H18.91076V23.83853H153.339m2-2H16.91076V234.90284H155.339V21.83853Z" />
          <MapWrapper>
            <MapBackgroundRect
              x="-82.79933"
              y="17.50239"
              width="340.84113"
              height="219.81181"
            />
            <MapBackgroundPath d="M-39.30662,17.50243c8.02463.83163,26.04308-4.2926,24.32037,9.439-1.36239,1.57464-6.5377,6.67413-3.01861,7.96913.09649,2.15107,3.01012-1.0195,4.08345,1.25979,2.60848,3.921,2.84182,9.93829,5.50267,14.682,1.69641,3.455,7.69953,2.23487,6.03545,9.64859,1.1044.31864,1.34494,2.25884,1.42108,3.35531,4.00544,4.09135.3782,3.55442.17661,6.08162,8.81353-2.873,12.09845,1.79669,7.63356,11.95665,4.2563,5.32021-2.56739,5.84379-4.61468,9.22831-5.20463-.5542-10.69763,3.64348-15.97684,3.14542-1.01784-1.06556-2.01724.783-2.663,1.46907-2.54941,1.49339-3.7419-3.19041-6.39058-2.09724-4.07459,2.30073-.55987,5.10336-7.98913,3.77313-4.05272,4.27379-12.53,3.61245-4.43772-2.30615.09838-1.69927,1.99587-2.84373,3.01787-3.98477.13392-1.43688.13116-2.46148,1.59825-2.09681,1.08641-1.09634,1.64956-2.67672,3.3729-2.3068,4.14217-3.52118-15.3147-5.36043-7.9885-9.23085,4.70173,3.35214,11.33365-8.71389,3.5502-6.9209-1.82651-1.38868,2.66432-1.47905,1.41972-3.98455-1.932-7.25535,8.88992,6.13507,8.16534-8.80951-1.31585-2.20194-4.30933-2.64576-4.4364-5.87267-16.72912.59056,1.65287-11.74311-9.94215-14.68141-.58967-2.64353-5.77837-7.439-2.48505-9.07143-1.15934-1.04273-2.388-2.9746.00063-3.256C-39.30235,23.85915-39.3623,18.86466-39.30662,17.50243Z" />
            <MapBackgroundPath d="M73.242,17.50239c1.20712,2.85162,48.89563-6.50262,39.7639,5.44915-3.31811,1.45752,3.43663,6.42867-2.66276,7.55462-6.35438-.37485-4.23977,9.78981-7.45516,13.8435-.85393,6.37308-9.32719.53453-12.071,5.03435,5.02846,7.28151-11.83109,12.10944-8.876,3.79564-2.89-3.00292.78932-6.7154-.00064-10.50816C78.77724,34.76012,73.974,27.10216,73.242,17.50239Z" />
            <MapBackgroundPath d="M108.92377,36.58909c-.67217,1.921-2.2182,11.2983-4.26064,7.82586C104.57407,42.33945,108.61705,31.47053,108.92377,36.58909Z" />
            <MapBackgroundPath d="M125.43326,28.22691c-2.22968.3493-2.01393,2.18592-2.66239,4.1679-.93719.31914-2.31755,1.25175-2.04181,2.62284-7.45978,13.80811-5.13733-11.01823,3.28463-8.07574C125.45827,25.0425,125.54207,26.539,125.43326,28.22691Z" />
            <MapBackgroundPath d="M158.45224,17.50236l99.58952,0,.00007,219.81181-83.25755,0c.12285-8.84482-2.92506-5.30326-7.63426-7.75939-2.74218-4.35562-1.00216-10.01142-6.03605-12.58467,1.77986-4.05184,2.96753.81477,5.3268-.001,1.8766-.803-1.31909-1.61919.53354-3.77489-.67635-2.26214-3.94232-3.95743-.53374-4.19524.97764-4.51208-8.467,4.65459-3.905-7.76118,3.90157-1.49938,6.7539.84552,10.11818-1.2598,2.99327-.10222,4.68762,2.109,7.63378,1.47034-1.422-11.49944,3.10978-3.58328,12.95962-5.45483,5.175-2.08418,8.26505-8.46937,14.37874-7.97,4.0795,1.78459,9.53114-2.13831,12.24867,2.727,4.49075,3.80759,2.27418-1.82254,6.03528,3.98617,8.727,2.59613,27.32072,9.82744,26.62888-8.60069-1.64638-11.54414-4.85021-11.739-12.073-16.9869-7.38056-2.067.3446-4.62034-10.47243-6.71231,1.15834-2.21146,2.52239-2.33784,5.32613-2.51775.63059-1.67535,1.1531-3.21461,3.01811-3.56549.49446-3.06375,4.07811-4.72207-.00184-6.92223-.24176-2.86053,6.69213.75419,5.8597-3.14624,10.46058-4.91743-7.23827-3.02485-9.76338.00031-6.13831,1.13077-20.65484,3.18364-13.3147,12.79381,2.32454,2.11127,9.0464-1.7795,8.16682,3.776-5.13389.61223-9.04255-2.25-11.00634,5.24479-1.73285,4.64786-10.02428-1.18779-8.16616-5.87329-1.87735-1.50586-4.76934-3.27848-7.10086-3.56785-.19513-1.65243,2.79351-.69892,3.72755-1.46744-.31106-3.48357,7.21165-1.96311,1.77482-5.24363-5.92972.96339-1.95706,5.646-6.21281-2.93679-2.63177-.93558-6.69948-2.50417-9.4089-1.39306-.20693,4.9381-7.361,7.95531-6.38972,13.97909-1.28225,2.16373-4.33172,2.63955-6.0367,4.19455-1.74262,4.02929-.02944,12.702-6.0361,8.80821-.61258,3.83926,1.57117,9.00861-3.19554,8.38967,3.35954,3.3634,3.965,8.65283,7.45639,11.95641-5.87045.17141-9.69718,5.36313-15.44448,4.40444-1.59518-1.24273-9.83814-5.16365-10.11846-1.25912-1.47218,1.84943-.68035-2.45373-2.308-1.67686-.49869,4.23992-8.99161-3.23249-.17721,6.29253a6.85812,6.85812,0,0,1-3.19559-.62982c-.54854,2.13259-1.29231-.44242-2.48556-.20956,2.07291,6.131-2.00455-1.62394-3.90552-.83828-.23108-2.47474-2.01478-1.53625-3.373-.83965,1.15257,3.18342,4.66487,4.88523,5.50336,8.38994,2.03566.05911,1.05127,1.29945.35466,2.51653,3.30341.234,6.77143,3.66114,7.1014,7.76062-1.59658,2.86437-8.17883-7.6037-4.272-1.63945,6.643,11.22234-5.9433-.923-5.49162,1.8482,1.48705,1.45533,3.53358,3.4985,3.37305,5.66417-8.51818-6.72441,3.36132,15.38647-5.327,5.45344-2.31774.89218-3.09017,5.63154-3.19484-.83947-1.79162-3.447-.87913-.51365-2.13793,1.04887-1.42471-.89253-1.52519-2.95579-1.23421-4.61439-.8568-2.36756-7.737-18.163-4.26-3.77585.072,4.53855-3.14271-4.22349-3.01822-5.87167.2459-2.37149,1.09814-5.1153-.356-7.34134-.58063-1.49-2.273-.66825-2.83954-2.30748-1.95436-1.58176.20444-1.46651.355-3.35627-6.07061-3.11752-1.75751-9.88344-2.66246-15.311-2.57487.34214-2.95807-5.23246-6.03638-5.24271-3.39915-2.05119-5.63217-8.36251-9.76353-8.81-4.76232.8041-7.53733-3.75517-11.36154-5.66282.2792-2.088-.48483-5.74791-2.83984-6.29233a5.73769,5.73769,0,0,0-.88847-5.03383c-1.85569,1.188-1.19044,5.02468-3.90489,3.56491-.95959-1.94831-.70881-1.19625-2.66353-1.88606.23039-16.3663-20.37837,4.79332,2.31044,13.84076,1.42574,17.48911,15.73375,11.0389,22.01121,19.08634-.106,11.4443-3.38577,2.72425-5.50355,13.42547,6.2015,1.77532.3506,10.49858-2.48536,13.63281-3.8625,3.701-1.41652-.64712-2.13082-4.195,1.56508-14.94117-4.35852-8.8612-6.56876-15.93917-3.7417-.29449-2.84456-3.37643-5.6794-2.30878.67461-2.44721.11275-3.3936-1.95343-3.77455-7.04783-2.7751-15.92076-11.95141-19.70571-18.666-1.07318-1.06093-2.13517-2.8929-1.59616-4.61588-1.11074-5.1688-8.19709-3.92613-11.00681-1.2592-2.79786,2.97045-4.64507,8.10586-9.23147,7.97015-5.14218-1.15976-10.21535-5.22138-15.799-4.40318-13.02783,4.13867-5.1351,7.24279-8.87511,12.7938-9.39456,1.93062-12.46032,12.613-20.41489,16.152-2.45317,3.03654,1.84624,6.16958,1.5954,10.06663,2.79745,3.68734-3.71295.27286-4.081,2.51577-.58339,2.60826-2.99537,3.95747-2.48656,6.712-9.40861.15307-4.61936,7.91962-18.107,5.87156-.80725,3.18968-4.399.04109-5.68005,1.88888-11.43128,8.57009-11.01894-5.4288-30.71123-4.61488.75471-1.42349.82471-3.79495-.17763-5.03277-1.21709-3.32572,2.40917-8.38944-.88774-10.6969,12.83389-41.31844-20.91643-42.28092,48.46453-36.28809,7.96874-.75581,4.55242-3.9753,6.034-10.90554,2.11184-8.5378-1.07836-11.06386-1.59871-18.45621C-24.74,122.90243-14.8865,131.81372-33.982,124.68319c-9.69474-7.29224,5.66294-6.57759,10.29719-8.60159,1.35562,2.9802,11.41364,3.94205,10.29691-.41815-9.29489-15.947,12.15458-3.77287,18.63885-8.8114,3.859-8.217,2.89791-13.92472,12.78207-13.63848-.13121-3.94243,4.72957-4.16594,4.4373-8.38347,1.81908-1.303,2.7265-9.46345,4.79381-3.77544,2.61592-.06693,2.54128,5.87,4.43762,3.39434,5.27107-2.4479-2.43552-4.74894,1.06529-8.008,3.85346-4.56961,10.16629-2.78007,15.08937-3.14695,2.21214-1.81,1.8658,1.47617,3.532,1.83708,1.02291-2.96316,1.5347-.25747,2.94007-3.72491,5.42734.47119,2.11423-1.05944,1.33867-4.61419.64478-2.13589-1.652-3.54507-1.59792-5.24289,1.83619-1.76073.16247-3.17825-.00025-5.034-1.90256-1.73407-3.18044-3.46383-1.24081-6.08284-1.38987-.91945-1.24162-4.25414-1.06723-5.873,2.14624-5.58614.01541-10.35152,7.81338-10.9054,2.15154.67878,3.37368-2.30561,3.549-4.40577,1.88372-.87542,5.70927-3.94964,4.79246.62868,1.34912,4.30167-3.475,5.04994-1.95226,9.22941-.28434,3.11608,3.782.56759,3.72835,2.93625-.47063,1.872-2.55188,3.84982-4.13508,3.98558-1.44984,4.19442-7.92475,5.31048-3.14249,10.48619-2.94889.78752-.43513,2.12157,1.24171,2.30819.74641,2.14771-6.21716.58531-1.59841,2.09706,4.84028,1.78483.87919,2.44454,1.065,5.663,3.42221-1.34035,6.28178,4.085,9.05425,2.72829,3.74836.71476,5.12262-3.77127,7.81062-3.98776,2.92108.89431,5.63312-4.71107,7.10138.21023.87551,2.26028-3.17733,1.45339-1.61618,4.40522,8.1355-.43219,17.69148-1.20043,23.45055-7.83815,3.09039-1.3128,10.8788.37153,13.84715-1.60062,4.12926-5.215,12.40615,5.79842,9.05283-6.92169,4.48433-10.28724-1.84651-9.97891,8.45311-23.59488,5.994-9.57917,7.93944,13.50023,14.98007,6.84979-.11244-3.01777,1.37625-6.35231.0001-9.26278C158.84208,25.88833,159.5057,21.48838,158.45224,17.50236Z" />
            <MapBackgroundPath d="M5.5587,206.69159c1.43928,1.03206.02316,1.22648.30067,2.79357C3.39229,209.743,2.9218,206.6777,5.5587,206.69159Z" />
            <MapBackgroundPath d="M15.9026,201.23824c2.65012,3.268-.15753.783-1.06477,5.87832-1.55655-.129-1.68135-2.9135-3.196-3.57083C11.96358,201.9792,14.56422,200.96365,15.9026,201.23824Z" />
            <MapBackgroundPath d="M22.47089,199.97977c2.11257,3.62912-4.34774.71365-2.47684-.20925A9.16586,9.16586,0,0,1,22.47089,199.97977Z" />
            <MapBackgroundPath d="M53.18209,178.79561c1.7416-.00234,1.8366-2.86574,3.195-2.937,2.41,5.47277-1.75132,7.09383-.17653,11.53633-.88778.62217-1.66812,2.86561-2.84093,2.30748-.54188-.888-3.91222-5.68214-2.66336-6.08251-.15911-.90374-1.03169-1.68343.35587-1.99879C50.74239,179.93459,51.91816,179.1417,53.18209,178.79561Z" />
            <MapBackgroundPath d="M53.89218,191.59c2.70763-2.59664,6.33381,6.761,3.19566,7.76014a24.89458,24.89458,0,0,1-.00147,8.18034c-1.03172,1.73626-2.70408-.84932-3.54942,1.04849-1.08513,6.99125-9.15007-2.34934-3.72758-6.08231-1.34036-1.55992-2.25975-3.35266-1.06474-5.45347-.496-.92314-1.59512-1.73135-.53288-2.72644.49706-.74349.01949-2.28135,1.24254-2.21322C49.3079,195.46746,52.49689,191.76482,53.89218,191.59Z" />
            <MapBackgroundPath d="M74.12963,218.43724c4.90422.53087,9.89963.96518,15.17815.0483,2.702-.43516,1.81493,3.89711,4.52673,3.30754.75244,15.01408-7.30651,9.47463-14.24281,4.82068C75.79213,225.84414,63.21964,218.66493,74.12963,218.43724Z" />
            <MapBackgroundPath d="M-7.17517,235.00705c1.20785-2.58258,4.75093-3.61969,5.50364-6.29185,1.15723.1054,3.07666.75552,3.01726-1.259,8.22518-.05434,15.82414-2.7502,23.96541-1.8899,2.27551-.79978,2.7384,4.256,4.438,1.89032.8412-2.32746,3.2645-2.16557,4.97085-2.51684.1732-1.8021,1.99348-.99444,2.66279-.00041,3.88055-1.44044,4.52493-.53226,7.9884,1.04972,3.67349-1.63162,15.48014-7.34367,15.79868.6315,7.79285-3.03115,3.6816-.22969,2.13115,4.19188-2.75244.30561-1.56739,4.32219-1.95309,6.502C61.59207,235.6337-12.5048,240.78326-7.17517,235.00705Z" />
            <MapBackgroundPath d="M64.89846,50.43222c1.866,1.1123-.24181,5.39633-1.59736,2.26932C60.00424,53.33238,63.957,48.35639,64.89846,50.43222Z" />
            <MapBackgroundPath d="M71.28923,47.70554c2.24761,1.45691,5.683-1.56206,8.52095-.09184.31089,1.5819-2.14209,2.49688-1.08747,4.18172.61133,1.49342-.72871,1.993-1.753,1.57309-2.5519.86343,3.82112,2.631.31571,3.77534-.59811,1.04324-.04947,2.849-1.55871,3.35556-1.67244-2.07023-.49394-5.83984-3.72734-4.823A4.9989,4.9989,0,0,0,66.851,52.74a19.29819,19.29819,0,0,0-.35566-3.35638C68.40281,48.74067,69.00975,45.69851,71.28923,47.70554Z" />
            <MapBackgroundPath d="M72.17684,58.40249c6.03467,4.39739.149,6.70136-2.57482,1.84434-.06683-2.307-2.90249-2.01536-2.218-4.571C68.66834,54.74045,71.90232,56.7277,72.17684,58.40249Z" />
            <g>
              <MapBackgroundBorder d="M54.06966,56.5148c5.27588-1.1598-.75222-4.34649,6.74581-1.89453" />
              <MapBackgroundBorder d="M43.95094,73.50408c.81461,1.34544-1.02279,2.9387-.53213,4.56784,2.02546,2.31651.0821,4.8549-1.24355,6.54836.57016,1.65611,2.3825,4.06069-.53286,5.03415.38723,1.78108-1.50412.01214-1.41937,1.678-4.70961-3.37882-3.11531,3.12867-3.38743,6.9946-1.81573,2.307-5.27278-1.72724-6.90888-3.21877-5.28347,2.35869-7.76713,2.06132-11.8939-1.89531" />
              <MapBackgroundBorder d="M35.42362,99.06385c-2.18289,2.36387-1.00186,3.169.71725,4.64289.36031,4.8725,2.15334,10.29615.53151,15.73122-8.03873-7.99353-18.67209-14.41515-28.9358-16.67058" />
              <MapBackgroundBorder d="M36.67258,119.438c4.14031,6.86171,12.14452,5.56005,4.6158,12.37393,4.19259,7.79991-15.01789,12.61823.00013,17.19986-.69377,1.88765-.029,4.85956.00052,6.50213-3.01822,3.02348-.43261,5.47028,2.66247,5.24315,2.88643,13.86742-6.83242,6.61668-1.67641,14.51647" />
              <MapBackgroundBorder d="M16.96772,179.6346c-11.05357-1.06792-23.41941-2.9248-33.55155-9.019" />
              <MapBackgroundBorder d="M41.99823,133.49089c2.41558,2.51676,5.55027-.39414,8.60649.73557.135-3.52388,3.94311-1.38973,5.77312-1.3649,9.53928,1.6842-.86595,3.05461,2.66233,6.503,1.73788-.25029,3.499,1.87475,5.35189,1.25706-.39108,1.09-.45264,3.40369-1.96964,2.72662-2.36747,1.08451,1.67488,5.53529-2.6718,3.14679-6.09758-4.26872-4.55795,4.38033-18.46247,2.51688" />
              <MapBackgroundBorder d="M60.8155,134.32986c4.81913,3.37019,12.30145-.29319,18.44716.002,2.80405-4.24055-2.21053-4.8688,5.6972-8.60035,3.43377-4.78649,9.41714-2.92056,14.19591-3.54358,3.33886-.85063,1.12769-6.36482,5.31794-2.74928,6.38114.47792,8.03684,9.06671,5.33716,14.89153-2.62428,1.921-6.32007,2.19332-4.96912,7.13165.90433,7.11207-3.51812,9.72157-8.1681,12.37347-2.551,6.08124-3.89288,7.0928-7.98728,2.9372" />
              <MapBackgroundBorder d="M63.65584,143.34885c6.413-1.486,24.05017-3.2267,17.92967,9.858" />
              <MapBackgroundBorder d="M104.66329,139.154c-5.643,5.47319-15.03167,5.87042-22.19017,7.55079" />
              <MapBackgroundBorder d="M86.37858,124.26213a3.70477,3.70477,0,0,0-2.98009-2.42507c-1.11448-1.858-1.72956-4.68644-4.10806-3.86665-1.37215-2.25224-1.34068-5.55884-3.02964-7.13241,4.98812-5.7126,13.13231-7.28364,19.88122-7.35959,13.10072,12.32916,18.132,3.90442,11.00657,16.79858" />
              <MapBackgroundBorder d="M110.7681,113.87006c10.23873,2.26909,19.614-6.17067,29.75462-4.07978,7.40268,2.152,9.5549-2.66139,6.53355,8.17992-7.10387,2.18819-13.39035.28095-18.94454,9.33578-14.4861.37363-7.73112,13.95118-17.20888,2.69172" />
              <MapBackgroundBorder d="M147.05757,117.96979c10.673,17.91851,3.15606.39762-3.50869,28.73582-6.26255,12.33661-33.21085,16.96306-39.55972,1.49977" />
              <MapBackgroundBorder d="M153.48168,126.5693c35.76565,3.943,12.93542,40.50069,33.019,32.34024" />
              <MapBackgroundBorder d="M178.68973,174.07031c-9.614-6.6079-13.52532-3.65456-22.54529-1.56454-8.03629-.44892-21.37388-5.40155-20.59242-17.20153" />
              <MapBackgroundBorder d="M173.00905,185.08789c-5.14283,7.53474-48.31728,4.11291-31.244-8.60007-.92212-3.02836-2.10537-7.21636-1.775-10.48663" />
              <MapBackgroundBorder d="M161.29264,197.67254c-1.93809-3.18218.129-6.38049,1.95553-8.87316" />
              <MapBackgroundBorder d="M124.01315,207.74027c.904-15.055,19.12855-10.887,24.14291-18.45749" />
              <MapBackgroundBorder d="M176.02686,17.50236c2.45048,16.19589-13.179,7.29087-20.77,10.06772" />
              <MapBackgroundBorder d="M173.67319,27.57008C183.83765,77.17919,152.3,29.81257,133.59925,49.803" />
              <MapBackgroundBorder d="M132.38805,57.144c20.834-.935,5.36494,24.3465-8.19743,1.8877" />
              <MapBackgroundBorder d="M176.02687,49.527c-9.94213,8.50343,7.42826,20.83759,4.79239,32.15641-3.75845,9.08558-13.78153,11.28547-20.22856,4.82367-2.29031-.00747-8.01672.65871-9.41614-2.30676-2.28277-6.27183-5.05719-14.03209-10.65335-17.09688" />
              <MapBackgroundBorder d="M180.82,81.68405c31.74138,17.72915,3.31761,22.09761-13.91344,27.266-26.85352,1.18634-14.60684,1.97525-13.24733-22.44184" />
              <MapBackgroundBorder d="M96.14225,103.478c-3.41247-4.68251-.28087-13.52664-5.50444-16.96944,1.29365-5.64331-.97483-10.83931-.88823-16.57017" />
            </g>
          </MapWrapper>
          <Overlay
            x="18.91081"
            y="23.83853"
            width="134.4281"
            height="209.06432"
            transform="translate(172.24973 256.74138) rotate(180)"
          />
        </Wrapper>
        <TextWrapper
          x="25.4653"
          y="90.12448"
          width="120.14814"
          height="75.86916"
        />
        <Text transform="translate(29.46645 148.41021)">Tickets</Text>
      </TicketBackWrapper>
    </BasicCard>
  );
};

export default TicketBack;
