# Welcome to your Expo app 👋
Week 1 

<img width="437" height="945" alt="image" src="https://github.com/user-attachments/assets/a005f384-b278-46c2-9557-135b866b8e55" />

<img width="437" height="945" alt="image" src="https://github.com/user-attachments/assets/3599d85b-9a28-4fff-8947-96f95d65def2" />

<img width="437" height="945" alt="image" src="https://github.com/user-attachments/assets/84d5dda3-7a75-4f4b-939f-b2e3fcd224bf" />


Week 2 SIGN IN AND SIGN UP PAGE 

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/bbaa81d7-7b4b-4c1f-9fad-76f282e196e2" />


<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/12b7ad2f-e888-4d81-b3ed-a75283a4af6c" />


WEEK 3 Activity : Advanced Navigation 

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/c37b1e5a-39d8-4cc1-bfc7-24796ec29cd7" />
The app integrates full swipe gesture support for drawer navigation with edge detection and swipe distance thresholds to ensure smooth opening and closing. Transition animations use Reanimated’s useDrawerProgress to apply scaling, translation, and dynamic border-radius effects for polished screen transitions. Navigation state is persistently stored via AsyncStorage, allowing the app to restore the last visited screen and drawer state even after restart. Validation and cleanup logic ensure corrupted saved data does not disrupt navigation flow.



Week 4: State Management Activity 1 -  (Spotify Playlist Builder App)

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/9c4b587f-df4c-4c1b-89fe-b19d33056fbe" />


Week 4 Activity 2 - (Spotify Profile Creation Form) 

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/0624bde8-9e35-460b-ad8d-b31518fe3b41" />
Simple tap and gesture-based interactions are used in the playlist builder and profile panels to add, remove, or rearrange things as well as enter user data. Reanimated button, modal, and fade animations produce seamless visual changes throughout the user interface. To preserve user progress, AsyncStorage keeps track of playlist data, history stacks, and profile information independently. Every action is recoverable between app sessions thanks to the playlist's fully stored undo/redo feature.


Week 5: (Device Features)

Act 1: Theme Switcher 
<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/9c910aea-cae3-46ba-a6f5-70f0f0957124" />

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/bb3ec361-8a5f-458a-8617-44015c9f2065" />

Act 2: (Camera with Filters)

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/846217af-c0a6-4dc9-843e-b6adc9e0998f" />

The camera app uses advanced PanResponder gestures for filter sliders, dragging, and crop adjustments, enabling precise and responsive editing controls. Animated transitions enhance both theme switching and filter application, providing smooth visual feedback throughout the UI. Theme settings—light, dark, or custom—are saved through Redux Toolkit with AsyncStorage integration to ensure preferences persist across sessions. Filter previews and editing animations create a dynamic and engaging user experience.


Week 6: Location-Based Map Features

<img width="1170" height="2532" alt="image" src="https://github.com/user-attachments/assets/25d5289e-96b9-452f-9067-6360ff5fc792" />

The map screen uses native map gestures such as zoom, pan, and marker selection, along with tap interactions for switching layers and handling permissions. Transitions between map types are visually smooth, complemented by animated markers and region movements when focusing on specific locations. Geofencing visuals update dynamically as the user moves, providing real-time feedback on proximity to key areas. While focused on live location tracking rather than storage, map preferences can be extended for future persistence.






This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
