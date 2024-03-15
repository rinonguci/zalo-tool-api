//@ts-nocheck
import CryptoJS from "crypto-js";

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

export async function getLoginInfo(payload) {
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
          cookie: `zpw_sek=${payload.zpw_sek};`,
        },
      }
    );
    const dataResp = await resp.json();
    console.log("🚀 ~ getLoginInfo ~ dataResp:", dataResp);
    const s = A.decodeAES(enk, dataResp.data);
    return JSON.parse(s);
  } catch (h) {
    logCoreError("Err when decrypt/parse param", h);
  }
}
