//@ts-nocheck
const translate = require("@vitalets/google-translate-api");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 1234;
const CryptoJS = require("crypto-js");

export interface InfoUserZalo {
  haspcclient: number;
  public_ip: string;
  language: string;
  zpw_sek: string;
  zpw_ws: string[];
  zpw_chts_new: string[];
  qos_url: string;
  support_page: string;
  uid: string;
  qos_setting: QosSetting;
  dkey: string;
  zpw_service_map: ZpwServiceMap;
  cslper: number;
  need_update_account: number;
  send2meid: string;
  qos_interval: number;
  zpw_service_map_v3: { [key: string]: string[] };
  viewerkey: string;
  current_time: number;
  zalo_tracking: ZaloTracking;
  send2me_legacyName: Send2MeName;
  zpw_conf: { [key: string]: number };
  settings: Settings;
  zpw_chts: string[];
  zpw_cht: string;
  zpw_ctrs_new: string[];
  support_pages: SupportPages;
  zalo_cloud: InfoUserZaloZaloCloud;
  zpw_wpsk: string;
  zpw_service_map_new: ZpwServiceMapNew;
  config_pages: ConfigPages;
  user_mode: number;
  zcloud: Zcloud;
  zpw_ctrs: string[];
  zpw_ctr: string;
  send2me_name: Send2MeName;
  zpw_enk: string;
  default_covers: string[];
  gmap_url: string;
  phone_number: string;
  extra_ver: ExtraVer;
}

export interface ConfigPages {
  zalo_page: string;
  popup_pages: string[];
}

export interface ExtraVer {
  ver_sticker_giphy_suggest: number;
  ver_giphy_cate: number;
  friend: string;
  alias: string;
  ver_sticker_cate_list: number;
  phonebook: number;
}

export interface QosSetting {
  log_type: number;
  apiUrl: string;
  data_version: number;
  enable: number;
  maxRecordSubmit: number;
  numberLogSubmit: number;
  qos_interval: number;
  dataExpiredTime: number;
  minTimeSubmit: number;
  logInterval: number;
}

export interface Send2MeName {
  VI: string;
  EN: string;
  MY: string;
}

export interface Settings {
  gif: GIF;
  invitation: Invitation;
  keepalive: Keepalive;
  sharefile: Sharefile;
  dynamic_layout_photo: DynamicLayoutPhoto;
  sticker: Campaign;
  my_settings: MySettings;
  enable_get_last_seen: number;
  campaign_poll: CampaignPoll;
  features: Features;
  common: Common;
  chat: SettingsChat;
  friend: Friend;
  campaign: Campaign;
  actionlog: Actionlog;
}

export interface Actionlog {
  action_log_interval: string;
}

export interface SettingsChat {
  enable_send2me: number;
  enable_warning_gif: number;
  enable_call: number;
  time_undomsg: number;
  enable_video_call: number;
}

export interface Common {
  enable_new_cap: number;
  enable_show_notify_local: number;
  limit_pin_messages: number;
  enable_sync_cloud_first_login: number;
  enable_scan_apps: number;
  auto_pin_send2me: number;
  first_time_login_device: number;
  is_stg: number;
}

export interface DynamicLayoutPhoto {
  special_threshold: number;
  min_height: number;
  threshold: number;
  special_height: number;
  special_condition: number[];
  total_limit: number;
  setting: number;
  height: number;
  min_width: number;
}

export interface Features {
  voice: Voice;
  image: Image;
  zalo_cloud: FeaturesZaloCloud;
  e2ee: E2Ee;
  retry_upload_file_configs: RetryUploadFileConfigs;
  cloud_setting: CloudSetting;
  notify_missing_messages: NotifyMissingMessages;
  conv_ux_ver: number;
  cross_setting: CrossSetting;
  enable_get_last_seen: number;
  media_settings: MediaSettings;
  ba_config: BaConfig;
  config_fetch_fr_list: ConfigFetchFrList;
  message_status: MessageStatus;
  download_old_media: DownloadOldMedia;
  metric: Metric;
  quick_message: QuickMessage;
  socket: Socket;
  syncActionMedia: SyncActionMedia;
  product_catalog: ProductCatalog;
  conv_ux_switcher: number;
  pin_topic_one_on_one: PinTopicOneOnOne;
}

export interface BaConfig {
  extra: Extra;
  ba_pkg_config: BaPkgConfig;
}

export interface BaPkgConfig {
  profile: Profile;
  catalog: Catalog;
  qm: Qm;
  ar: Ar;
  label: Label;
  broadcast_msg: BroadcastMsg;
  contact: Contact;
  chat: BaPkgConfigChat;
  search: Search;
  multi_window: MultiWindow;
}

export interface Ar {
  enable: { [key: string]: number };
  feaid: number;
  config: ArConfig;
}

export interface ArConfig {
  limit_template_create: { [key: string]: number };
  limit_template_active: { [key: string]: number };
}

export interface BroadcastMsg {
  enable: { [key: string]: number };
  feaid: number;
  config: BroadcastMsgConfig;
}

export interface BroadcastMsgConfig {
  enable_broadcast_msg_file_photo: { [key: string]: number };
  enable_broadcast_msg_save_list: { [key: string]: number };
}

export interface Catalog {
  enable: { [key: string]: number };
  feaid: number;
  config: CatalogConfig;
}

export interface CatalogConfig {
  limit_total_product_create: { [key: string]: number };
  limit_total_catalog_create: { [key: string]: number };
  limit_photo_per_product: { [key: string]: number };
}

export interface BaPkgConfigChat {
  enable: { [key: string]: number };
  feaid: number;
  config: ChatConfig;
}

export interface ChatConfig {
  unbox_stranger_thread: { [key: string]: number };
}

export interface Contact {
  enable: { [key: string]: number };
  feaid: number;
  config: ContactConfig;
}

export interface ContactConfig {
  limit_num_friend: { [key: string]: number };
}

export interface Label {
  enable: { [key: string]: number };
  feaid: number;
  config: ConfigClass;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfigClass {}

export interface MultiWindow {
  enable: { [key: string]: number };
  feaid: number;
  config: MultiWindowConfig;
}

export interface MultiWindowConfig {
  num_max_child_window: { [key: string]: number };
}

export interface Profile {
  enable: { [key: string]: number };
  feaid: number;
  config: ProfileConfig;
}

export interface ProfileConfig {
  limit_search_friend_by_phone_monthly: { [key: string]: number };
}

export interface Qm {
  enable: { [key: string]: number };
  feaid: number;
  config: QmConfig;
}

export interface QmConfig {
  limit_template_create: { [key: string]: number };
  file_limits: { [key: string]: number };
  enable_rtf: { [key: string]: number };
}

export interface Search {
  enable: { [key: string]: number };
  feaid: number;
  config: SearchConfig;
}

export interface SearchConfig {
  limit_search_friend_by_phone_per_hour: { [key: string]: number };
  limit_search_me_by_phone_per_month: { [key: string]: number };
}

export interface Extra {
  expired_time_ev_update_pkg: number;
  link_acc_upgrade: string;
  enable_bt_upgrade_ba: number;
  link_learn_more_limit_phone: string;
  link_learn_more_limit_friend: string;
  link_learn_more_limit_chat: string;
  link_entry_regist_trial: string;
  cate_shop: CateShop[];
  pos_label_config: { [key: string]: number[] };
}

export interface CateShop {
  id: number;
  vi: string;
  en: string;
}

export interface CloudSetting {
  debug: CloudSettingDebug;
  auto_download: AutoDownload;
}

export interface AutoDownload {
  enable: number;
}

export interface CloudSettingDebug {
  show_msg_src: boolean;
}

export interface ConfigFetchFrList {
  time_interval_fetch_fr_list: number;
}

export interface CrossSetting {
  useTheme: string;
  enable: boolean;
  enableOverQueue: boolean;
  cfTimeout: number;
  enableResume: boolean;
  enableFirstTimeUse: boolean;
  isMobileSupport: boolean;
}

export interface DownloadOldMedia {
  dispose: boolean;
}

export interface E2Ee {
  debug: E2EeDebug;
  check_subdevice_stale: boolean;
  learn_more: LearnMore;
  max_retry_reinit: number;
  respone_fail_init_new_device: boolean;
  hide_icon_convitem: boolean;
  allow_stranger_chat: boolean;
  enable: boolean;
  force_reset: boolean;
  sticker_suggestion: number;
  max_retry_resend: number;
  bundle_err_stop_retry: number[];
}

export interface E2EeDebug {
  enable: boolean;
  persist: AutoDownload;
}

export interface LearnMore {
  what_is_it: string;
  how_to_upgrade: string;
  troubleshoot_upgrade: string;
  troubleshoot_usage: string;
}

export interface Image {
  enable_gen_thumb: number;
  enable_download: number;
}

export interface MediaSettings {
  delete_gap: number;
  chunk_size: number;
  dfe_media_campaign: number;
  media_cloud: number;
}

export interface MessageStatus {
  delay_show_sending: number;
}

export interface Metric {
  config: MetricConfig;
}

export interface MetricConfig {
  query_resolution_time: boolean;
}

export interface NotifyMissingMessages {
  data_content: DataContent;
  enabled: number;
}

export interface DataContent {
  version: number;
  content: Content;
}

export interface Content {
  conversation: Conversation;
  global_search: Conversation;
  search_in_conversation: Conversation;
  bubble_csc: BubbleCsc;
  media_list: Conversation;
  transfer_modal: TransferModal;
  download_banner: DownloadBanner;
}

export interface BubbleCsc {
  desc: BubbleCscDesc;
  suggestion: BubbleCscDesc;
}

export interface BubbleCscDesc {
  pc: PC[];
  web: PC[];
}

export interface PC {
  text: string;
}

export interface Conversation {
  desc: BubbleCscDesc;
}

export interface DownloadBanner {
  suggestion: Suggestion;
}

export interface Suggestion {
  web: PC[];
}

export interface TransferModal {
  title: TitleClass;
  desc: TitleClass;
  suggestion: TitleClass;
}

export interface TitleClass {
  pc: PC[];
}

export interface PinTopicOneOnOne {
  enabled: number;
  enabled_pin_entry_point: number;
}

export interface ProductCatalog {
  limit_size_photo: number;
  link_tutorial_catalog: string;
  enable_feature: number;
  limit_price_num: number;
  limit_length_name_prod: number;
  limit_length_des: number;
  list_keyword_suggest: string[];
  link_regist_catalog: string;
  limit_length_name_catalog: number;
  enable_suggest_create_product_1_1: number;
  enable_mining_sale_shop: number;
  enable_suggest_create_product_campaign: number;
  limit_num_product_per_catalog: number;
}

export interface QuickMessage {
  enable: number;
  expiration_time: number;
}

export interface RetryUploadFileConfigs {
  enable_predownload_file: number;
}

export interface Socket {
  rotate_error_codes: number[];
  retries: Retries;
  debug: SocketDebug;
  ping_interval: number;
  reset_endpoint: number;
  close_and_retry_codes: number[];
  max_msg_size: number;
  enable_ctrl_socket: boolean;
  reconnect_after_fallback: boolean;
  enable_chat_socket: boolean;
  submit_wss_log: boolean;
  disable_lp: boolean;
}

export interface SocketDebug {
  enable: boolean;
}

export interface Retries {
  "3000": The3000;
  "3002": The3000;
  "3003": The3000;
  "4001": The3000;
  "4002": The4002;
  "5001": The3000;
  "5007": The3000;
  "5008": The3000;
  "5011": The3000;
  "5012": The501;
  "5013": The501;
  "5014": The3000;
  "5015": The3000;
  internal: The3000;
  swap_endpoint: The4002;
  system_resume: The4002;
  manual: The4002;
  cannot_reach_server: The3000;
  no_network: NoNetwork;
  interval_check: The4002;
}

export interface The3000 {
  max: number;
  times: number[];
}

export interface The4002 {
  times: number;
}

export interface The501 {
  max: number;
  times: number;
}

export interface NoNetwork {
  times: number[];
}

export interface SyncActionMedia {
  enable: number;
  msgType: number;
  minCampaignSize: MinCampaignSize;
  minMsgSize: MsgSize;
  maxMsgSize: MsgSize;
  validDays: number;
  submitActionThrottle: number;
  maxRerun: number;
  enableRerun: number;
  rerunFirstTime: number;
  intervalRerunDownload: number;
  intervalCleanAction: number;
  deleteRange: DeleteRange;
}

export interface DeleteRange {
  from: number[];
  to: number[];
}

export interface MsgSize {
  video: number;
  file: number;
}

export interface MinCampaignSize {
  photo: number;
  video: number;
  file: number;
}

export interface Voice {
  voiceUrl: string;
}

export interface FeaturesZaloCloud {
  z_cloud: PurpleZCloud;
}

export interface PurpleZCloud {
  plan: number;
}

export interface Friend {
  enable_block_friend: number;
  enable_vbcontact: number;
  enable_request_friend: number;
  enable_connect_google: number;
  enable_connect_facebook: number;
  suggestion_show_interval: number;
  enable_friend_suggestion: boolean;
  enable_add_close_friend: number;
  enable_remove_friend: number;
  suggestion_position: number;
  enable_spcontact: number;
  suggestion_number_in_msgtab: number;
}

export interface GIF {
  max_width: number;
  enable_warning_gif: number;
  max_gif_size: number;
  enable_gif: number;
  max_height: number;
  google_key: string;
}

export interface Campaign {
  avt_campaign_template: AvtCampaignTemplate[];
  max_member: number;
  enable_media_store: number;
  force_rename_campaign: number;
  topic_emojies: string[];
  max_campaigns_per_user: number;
  max_invited_users: number;
  topic_colors: number[];
}

export interface AvtCampaignTemplate {
  title_en: string;
  title_vn: string;
  avt_template: string[];
}

export interface CampaignPoll {
  enable: number;
  min_options: number;
  max_options: number;
}

export interface Invitation {
  text_buttuon_csc: string;
  text_show_csc: string;
}

export interface Keepalive {
  keepalive_duration: number;
  alway_keepalive: number;
  time_deactive: number;
}

export interface MySettings {
  show_online_status: boolean;
  quick_message_status: number;
  setting_2FA_status: number;
  archived_chat_status: number;
}

export interface Sharefile {
  chunk_size_file: number;
  max_size_share_file_v3: number;
  max_size_resize_photo: number;
  max_size_share_file_v2: number;
  next_file_time: number;
  restricted_ext: string;
  max_size_share_file: number;
  max_size_original_photo: number;
  max_file: number;
  max_size_photo: number;
  max_size_gif: number;
}

export interface SupportPages {
  "5867585341136766544": number;
}

export interface InfoUserZaloZaloCloud {
  z_cloud: ConfigClass;
}

export interface ZaloTracking {
  api_url: string;
  max_record_submit: number;
  data_expired_time: number;
  min_time_submit: number;
}

export interface Zcloud {
  enk: string;
  viewer_key: string;
}

export interface ZpwServiceMap {
  chat_sticker: string;
  voicecall_api: string;
  file: string;
  chat_text: string;
  chat_lp: string;
  profile: string;
  friend: string;
  chat_photo: string;
}

export interface ZpwServiceMapNew {
  other_contact: string;
  voice_call: string;
  profile: string;
  sticker: string;
  label: string;
  sp_contact: string;
  media_store_send2me: string;
  campaign_poll: string;
  media_store: string;
  campaign_cloud_message: string;
  file: string;
  friendLan: string;
  chat: string;
  friend: string;
  alias: string;
  campaign_board: string;
  conversation: string;
  campaign: string;
}

function logCoreError(...args) {
  console.log(...args);
}

class A {
  constructor(e) {
    const t = this;
    const { type: s, imei: a, firstLaunchTime: n } = e;
    (this.createZcid = (e, t, s) => {
      if (!(e && t && s))
        return (
          logCoreError("ParamCipher error: not enough information", e, t, s), !1
        );
      if (this.zcid)
        return logCoreError("ParamCipher error: already create zcid"), !1;
      {
        const a = `${e},${t},${s}`,
          n = A.encodeAES("3FC4F0D2AB50057BCE0D90D9187A22B1", a, "hex", !0);
        if (((this.zcid = n), (this.encryptKey = null), !n))
          return logCoreError("ParamCipher error: can't encrypt"), !1;
      }
      return !0;
    }),
      (this.getParams = () =>
        this.zcid
          ? {
              zcid: this.zcid,
              zcid_ext: this.zcid_ext,
              enc_ver: this.enc_ver,
            }
          : (logCoreError("ParamCipher error: not create zcid yet"), null)),
      (this.getEncryptKey = () =>
        this.encryptKey
          ? this.encryptKey
          : (logCoreError("ParamCipher error: not create encryptKey yet"),
            null)),
      (this.createEncryptKey = function (e) {
        void 0 === e && (e = 0);
        if (!t.zcid || !t.zcid_ext)
          return (
            logCoreError(
              "ParamCipher error: didn't create zcid and zcid_ext yet"
            ),
            !1
          );
        try {
          let s = null;
          s = CryptoJS.MD5(t.zcid_ext).toString().toUpperCase();
          const a = ((e, s) => {
            const { even: a } = A.processStr(e),
              { even: n, odd: i } = A.processStr(s);
            if (!a || !n || !i) return !1;
            const o =
              a.slice(0, 8).join("") +
              n.slice(0, 12).join("") +
              i.reverse().slice(0, 12).join("");
            return (t.encryptKey = o), !0;
          })(s, t.zcid);
          if (a || !(e < 3)) return !1;
          t.createEncryptKey(e + 1);
        } catch (s) {
          return (
            logCoreError("ParamCipher error: create encrypt key", s),
            e < 3 && t.createEncryptKey(e + 1)
          );
        }
        return !0;
      }),
      (this.enc_ver = "v2"),
      (this.zcid = null),
      (this.encryptKey = null),
      this.createZcid(s, a, n),
      (this.zcid_ext = A.randomString()),
      this.createEncryptKey();
  }
  static randomString(e, t) {
    const s = e || 6,
      a = t && t > e ? t : 12;
    let n = Math.floor(Math.random() * (a - s + 1)) + s;
    if (n > 12) {
      let e = "";
      for (; n > 0; )
        (e += Math.random()
          .toString(16)
          .substr(2, n > 12 ? 12 : n)),
          (n -= 12);
      return e;
    }
    return Math.random().toString(16).substr(2, n);
  }
  static processStr(e) {
    if (!e || "string" != typeof e)
      return {
        even: null,
        odd: null,
      };
    const [t, s] = e
      .split("")
      .reduce((e, t, s) => (e[s % 2].push(t), e), [[], []]);
    return {
      even: t,
      odd: s,
    };
  }
  static encodeAES(e, t, s, a, n) {
    if ((void 0 === n && (n = 0), !t)) return null;
    try {
      {
        const n = "hex" == s ? CryptoJS.enc.Hex : CryptoJS.enc.Base64,
          i = CryptoJS.enc.Utf8.parse(e),
          o = {
            words: [0, 0, 0, 0],
            sigBytes: 16,
          },
          r = CryptoJS.AES.encrypt(t, i, {
            iv: o,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }).ciphertext.toString(n);
        return a ? r.toUpperCase() : r;
      }
    } catch (o) {
      return (
        logCoreError("ParamCipher err", o),
        n < 3 ? A.encodeAES(e, t, s, a, n + 1) : null
      );
    }
  }
  static decodeAES(e, t, s, a) {
    if ((void 0 === a && (a = 0), !t)) return null;
    try {
      t = decodeURIComponent(t);
      {
        const a = CryptoJS.enc.Utf8.parse(e);
        return (
          (s = s
            ? CryptoJS.enc.Hex.parse(s)
            : {
                words: [0, 0, 0, 0],
                sigBytes: 16,
              }),
          CryptoJS.AES.decrypt(
            {
              ciphertext: CryptoJS.enc.Base64.parse(t),
              salt: "",
            },
            a,
            {
              iv: s,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }
          ).toString(CryptoJS.enc.Utf8)
        );
      }
    } catch (n) {
      return (
        logCoreError("ParamDecryptor err", n),
        a < 3 ? A.encodeAES(e, t, s, a + 1) : null
      );
    }
  }
}

function _constructUrlParams(e) {
  const t = [];
  for (const s in e)
    e.hasOwnProperty(s) && t.push(s + "=" + encodeURIComponent(e[s]));
  return t.join("&");
}

export async function getLoginInfo(payload: { imei: string; zpw_sek: string }) {
  try {
    function getZaloClientId() {
      return payload.imei;
    }

    async function _encryptParam(e) {
      if (null == e) return null;
      const t = function (s, a, n, o) {
        void 0 === o && (o = 0);
        const r = new A({
          type: s,
          imei: a,
          firstLaunchTime: n,
        });
        try {
          const t = JSON.stringify(e),
            s = r.getEncryptKey(),
            a = A.encodeAES(s, t, "base64", !1),
            n = r.getParams();
          return n
            ? {
                encrypted_data: a,
                encrypted_params: n,
                enk: s,
              }
            : null;
        } catch (l) {
          return (
            logCoreError("Err when encrypted param", l),
            o < 1 ? t(s, a, n, o + 1) : null
          );
        }
      };

      const ez = getZaloClientId(),
        s = Date.now(),
        a = 30,
        o = t(a, ez, s);
      if (o) return o;
    }

    function getSignKey(e, t) {
      const s = [];
      for (const n in t) t.hasOwnProperty(n) && s.push(n);
      s.sort();
      let a = "zsecure" + e;
      for (let n = 0; n < s.length; n++) a += t[s[n]];
      return CryptoJS.MD5(a).toString();
    }

    async function encryptParam(e, t) {
      if (!t) return;
      let s = {};
      const a = await _encryptParam(e);
      if (a) {
        const { encrypted_params: e, encrypted_data: t } = a;
        (s = e), (s.params = t);
      } else s = e;
      return (
        (s.type = 30),
        (s.client_version = 625),
        (s.signkey = getSignKey(t, s)),
        {
          params: s,
          enk: a ? a.enk : null,
        }
      );
    }

    const data = await encryptParam(
      {
        imei: payload.imei,
        computer_name: "Web",
        language: "vi",
        ts: Date.now(),
      },
      "getlogininfo"
    );
    const { params, enk } = data;

    const query = _constructUrlParams({ ...params, retry: 0 });

    const resp = await fetch(
      "https://wpa.chat.zalo.me/api/login/getLoginInfo?" + query,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded",
          "sec-ch-ua": '"Chromium";v="119", "Not?A_Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"macOS"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          cookie: `zpw_sek=${payload.zpw_sek};`,
        },
        referrer: "https://chat.zalo.me/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );

    const dataResp = await resp.json();
    console.log("🚀 ~ getLoginInfo ~ dataResp:", dataResp);

    const s = A.decodeAES(enk, dataResp.data);
    console.log("🚀 ~ getLoginInfo ~ s:", s);

    return JSON.parse(s) as InfoUserZalo;
  } catch (h) {
    logCoreError("Err when decrypt/parse param", h);
  }
}

app.use(cors());

app.options("*", cors());

app.get("/123", async (req, res) => {
  const params = ["imei", "zpw_sek"];

  if (!req.query || (req.query && Object.keys(req.query).length === 0)) {
    return res.send("Missing params");
  }

  for (const param of params) {
    if (!req.query[param]) {
      return res.send(`Missing param ${param}`);
    }
  }

  const { imei, zpw_sek } = req.query;

  const data = await getLoginInfo({ imei, zpw_sek });

  return res.json(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
