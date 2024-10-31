# Atlas Live Pro App

Atlas Live Pro App is an IPTV player that allows users to watch live TV channels using their IPTV service credentials.

## User Journeys

### 1. Login and Watch Live TV

**Steps:**

1. **Open the App:**
   - The user opens the Atlas Live Pro App.

2. **Enter IPTV Credentials:**
   - The user is presented with a login form.
   - The user enters their **Username** and **Password** provided by their IPTV service.

3. **Submit Credentials:**
   - The user clicks the **Login** button.
   - The app authenticates the credentials by fetching the channel playlist from the IPTV service.

4. **View Available Channels:**
   - Upon successful login, the user sees a list of available TV channels.
   - Channels are displayed with their logo, name, and group (category).

5. **Select a Channel to Watch:**
   - The user clicks on a channel they wish to watch.
   - The selected channel starts playing in the built-in video player.

6. **Watch Live TV:**
   - The user watches the live broadcast of the selected channel.
   - The user can use standard video controls (play, pause, fullscreen).

7. **Switch Channels:**
   - The user can select a different channel from the list to watch another program.

8. **Logout:**
   - The user can click the **Logout** button to return to the login screen.

## Features

- **User Authentication:**
  - Login using IPTV service credentials (username and password).

- **Channel Listing:**
  - Displays available channels fetched from the user's IPTV service.
  - Channels are shown with images and grouped by categories.

- **Live Video Playback:**
  - Streams live TV channels within the app using HLS (HTTP Live Streaming).

## External API Usage

- **IPTV Service API:**
  - The app connects to the user's IPTV service (`https://apsmart.in`) to fetch the channel playlist.
  - Users must have valid credentials from their IPTV provider.
  
- **Sentry Error Logging:**
  - Used to capture and log errors in the app for debugging purposes.

## Environment Variables

- **Sentry DSN:**
  - `VITE_PUBLIC_SENTRY_DSN`: Your Sentry DSN for error logging.
  - `VITE_PUBLIC_APP_ENV`: The environment (e.g., development, production).
  - `VITE_PUBLIC_APP_ID`: The application ID for Sentry tags.

## Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run the App:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## Notes

- **Error Handling:**
  - The app displays error messages if login fails or if the user's browser does not support HLS playback.

- **Browser Compatibility:**
  - The app uses HLS.js to enable playback in browsers that do not natively support HLS.

- **Responsive Design:**
  - The app is responsive and works on various screen sizes for both desktop and mobile devices.

- **External APIs:**
  - The app fetches the M3U Plus playlist from the user's IPTV service using their credentials.

## Disclaimer

- **User Responsibility:**
  - Users are responsible for ensuring they have the rights to access and stream content from their IPTV provider.
