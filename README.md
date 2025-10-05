# 6530300601_work08_PartII

แอปตัวอย่าง **React Native (Expo)** เชื่อมต่อ **Firebase Authentication + Cloud Firestore** พร้อมระบบนำทาง (Stack + Drawer), Redux Toolkit, และสไตล์รวมศูนย์ (commonStyles / componentStyles)

## ✨ ฟีเจอร์หลัก

- **Splash → Login**: หน้าสแปลชรอ 2.5 วินาที แล้วตัดสินใจไป Login/DrawerNav ตามสถานะผู้ใช้  
- **Sign in**: ตรวจสอบอีเมล/รหัสผ่านบน Firebase Auth  
  - ไม่พบ/ไม่ถูกต้อง → Alert: “Wrong username or password”  
  - สำเร็จ → ไปหน้า **Profile** (ผ่าน DrawerNav)
- **Sign up**: สมัครผู้ใช้ใหม่ (Auth) + บันทึกข้อมูลผู้ใช้ใน Firestore (name, email, studentId)  
  - สำเร็จ → กลับหน้า **Login** พร้อม Alert: `"<firstname> has been added to system"`
- **Forgot password**: ส่งลิงก์รีเซ็ตรหัสผ่านไปยังอีเมล (รองรับกรณี Email Enumeration Protection)  
- **Profile**: แสดงชื่อ, นามสกุล, รหัสนิสิต, อีเมล (รวมจาก Auth + Firestore)  
  - ปุ่ม **Go to Splash**: ไป Splash แล้วกลับ Profile อัตโนมัติใน 2.5 วิ ถ้ายังล็อกอินค้าง  
  - **Sign out**: ลบ session แล้วนำทางไป Splash → Login ตามลำดับ (best practice)
- **Friends**: ค้นหาเพื่อนด้วยอีเมล (จาก collection `users`) → เพิ่มเพื่อนลง `users/{uid}/friends`  
  - กันเพิ่มตัวเอง / กันข้อมูลซ้ำ / กรอง key ซ้ำใน FlatList

---

## 🧱 เทคโนโลยี

- **React Native (Expo SDK 54)**
- **React Navigation**: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/drawer`
- **Redux Toolkit** + `react-redux`
- **Firebase v9+ (modular)**: Auth + Firestore  
- **AsyncStorage**: persistence ของ Auth บน RN  
- **Reanimated** (ผ่าน babel plugin)  
- สไตล์: `src/styles/commonStyles.js`, `src/styles/componentStyles.js`

---

## 📁 โครงสร้างโปรเจกต์ (ส่วนสำคัญ)

```
src/
  components/
    CustomButton.js
    CustomInput.js
    FriendCard.js
  firebase/
    index.js               # initializeApp + initializeAuth (AsyncStorage)
    models/
      Friend.js
      User.js
  navigation/
    DrawerNavigator.js     # custom drawer + logo + icons + title อยู่ขวาปุ่ม
    StackNavigator.js      # Splash, Login, Register, ForgetPassword, DrawerNav
  screens/
    SplashScreen.js        # 2.5s แล้วตัดสินใจไป Login/DrawerNav
    LoginScreen.js         # Sign in + รับ Alert จาก Register
    RegistrationScreen.js  # Sign up + Alert ส่งไปเด้งที่ Login
    ForgetPasswordScreen.js# ส่งลิงก์ reset + handle EEP
    ProfileScreen.js       # ข้อมูลโปรไฟล์ + Sign out + Go to Splash
    ChangePasswordScreen.js
    FriendScreen.js
  services/
    authService.js         # signIn/signUp/reset/changePassword/currentUser
    userService.js         # upsert/get/update ผู้ใช้ใน Firestore
    friendService.js       # search/add/list เพื่อน + กันซ้ำ/กันเพิ่มตัวเอง
  store/
    index.js
    selectors.js
    slices/
      authSlice.js
      profileSlice.js
      friendsSlice.js
  styles/
    commonStyles.js        # COLORS, METRICS, IMAGES, layout helpers
    componentStyles.js     # ปุ่ม/อินพุต/การ์ด/search bar ฯลฯ
```

---

## 🔧 การติดตั้ง & รัน

### 1) ติดตั้งเครื่องมือพื้นฐาน
- Node.js LTS
- Expo CLI (แนะนำใช้ผ่าน `npx`)

### 2) ติดตั้ง dependency
```bash
npm install
# หรือ
yarn
```

### 3) ตั้งค่า Firebase
ไปที่ **Firebase Console** สร้าง Project แล้วจด config (apiKey, authDomain, …)

อัปเดตไฟล์ `src/firebase/index.js` ให้เป็นของคุณ (คีย์ฝั่ง client **public ได้** แต่ควรจำกัดสิทธิ์ใน Firebase console):

```js
// src/firebase/index.js (ตัวอย่าง)
import { initializeApp, getApp } from "firebase/app";
import {
  getAuth, initializeAuth, getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};

let app;
try { app = getApp(); } catch { app = initializeApp(firebaseConfig); }

let auth;
try {
  auth = getAuth(app);
} catch {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { app, auth };
```

### 4) เปิดใช้งานใน Console
- **Authentication → Sign-in method**: เปิด **Email/Password**
- **Authentication → Users**: จะเห็น user หลัง Sign up
- **Authentication → Settings → Authorized domains**: ให้มีโดเมนที่ใช้ใน `actionCodeSettings.url` (ถ้าตั้ง)
- **Email Templates → Password reset**: ปรับ sender name/reply-to ถ้าต้องการ
- **Firestore**: สร้าง collection `users` สำหรับเก็บโปรไฟล์ และ subcollection `friends`

> ถ้าเมล reset ไม่เข้า inbox: ให้เช็ก **Spam/Trash**, หรือทดสอบด้วย Gmail; โดเมนองค์กรอาจบล็อกผู้ส่ง `noreply@<project>.firebaseapp.com`.

### 5) รันแอป
```bash
# รัน Dev server
npm start
# หรือ
npx expo start

# เปิด Android / iOS simulator
npm run android
npm run ios
```

> ถ้าเจอ behavior แคชแปลก ๆ ให้ลอง `npx expo start -c` เพื่อเคลียร์ cache

---

## 🧭 การนำทาง (Flows ที่สำคัญ)

- **Splash → (2.5s) → Login / DrawerNav**  
  ใช้ `AuthService.currentUser()` ตัดสินใจ ถ้ายังล็อกอินอยู่ให้เข้าหน้า DrawerNav (Profile)

- **Login**
  - `Sign in` → `authSlice.signIn` → สำเร็จ: `navigation.reset({ routes: [{ name: "DrawerNav" }] })`  
  - ล้มเหลว: Alert “Wrong username or password”
  - `Sign up` → ไปหน้า Register
  - `Forgot Password` → ไปหน้า ForgetPassword

- **Register**
  - สมัครสำเร็จ: บันทึก Firestore, `signOut()`, กลับหน้า Login พร้อม `params.welcomeMsg` → Alert: `"<firstname> has been added to system"`

- **Profile**
  - ดึงข้อมูลจาก Firestore (`profileSlice.fetchProfile`) + Auth (แยกชื่อ/นามสกุลจาก `name`)
  - `Go to Splash` → ไป Splash → (2.5s) ถ้ายังมี session ให้เด้งกลับ DrawerNav
  - `Sign out` (มี Alert confirm) → เคลียร์ session → `navigation.reset({ name: "Splash" })`

- **Friends**
  - ค้นหาเพื่อนด้วยอีเมล (normalize เป็น lowercase)
  - ป้องกันเพิ่มตัวเอง / ป้องกันบันทึกซ้ำ (เช็กที่ service + reducer dedupe)
  - แสดงผ่าน `FlatList` ด้วย `keyExtractor={(item) => item.uid}`

---

## 🧩 เคล็ดลับ & Troubleshooting

- **“Two children with the same key”**  
  เกิดจากเพิ่มเพื่อนซ้ำ → แก้แล้วโดยกันซ้ำใน `friendService.addFriend` + `friendsSlice` (dedupe)
- **Reset password ส่งแล้วไม่เข้าเมล**  
  - ตรวจ Spam/Trash  
  - หากเปิด Email Enumeration Protection อาจคืนค่าเหมือนสำเร็จแม้ไม่มีผู้ใช้ → โค้ดรองรับแล้ว  
  - บนโดเมนองค์กร: ต้องขอ IT whitelist ผู้ส่ง หรือใช้ SMTP องค์กรใน Email Templates
- **Header ชนขอบ/หลุดจอ**  
  ใช้ native header ของ React Navigation หรือถ้าทำ custom ให้รองรับ safe area ด้วย `useSafeAreaInsets()`
- **Metro/Expo cache แปลก ๆ**  
  `npx expo start -c` ช่วยได้บ่อยครั้ง

---

## 🔒 ความปลอดภัยของคีย์

ค่า `apiKey` ของ Firebase ฝั่ง client ไม่ใช่ความลับ แต่ควร:
- กำหนด **Security Rules** ของ Firestore ให้รัดกุม
- จำกัด **Authorized domains**, และตั้งค่า **reCAPTCHA** ให้เหมาะสมกับบริการอื่น ๆ (ถ้ามี)

---

## 📜 License

ใส่ลิขสิทธิ์/ใบอนุญาตตามที่ต้องการ (เช่น MIT) ในไฟล์ `LICENSE` ของโปรเจกต์

---

## 🙋 Support

มีคำถาม/บั๊ก แจ้งใน Issues ของ repo นี้ได้เลยครับ :)
