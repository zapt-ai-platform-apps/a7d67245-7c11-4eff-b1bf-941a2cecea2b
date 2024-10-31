import { createSignal, createEffect } from 'solid-js';
import { parse } from 'iptv-playlist-parser';
import Hls from 'hls.js';

function App() {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [playlist, setPlaylist] = createSignal([]);
  const [selectedChannel, setSelectedChannel] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://apsmart.in:80/get.php?username=${encodeURIComponent(
          username()
        )}&password=${encodeURIComponent(
          password()
        )}&type=m3u_plus&output=ts`
      );
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      const playlistText = await response.text();
      const parsedPlaylist = parse(playlistText);
      setPlaylist(parsedPlaylist.items);
    } catch (err) {
      console.error('Error fetching playlist:', err);
      setError('Failed to fetch playlist. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  const initPlayer = () => {
    try {
      const video = document.getElementById('video');
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(selectedChannel().url);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = selectedChannel().url;
      } else {
        setError('Your browser does not support HLS playback.');
      }
    } catch (err) {
      console.error('Error initializing player:', err);
      setError('Failed to play the selected channel.');
    }
  };

  createEffect(() => {
    if (selectedChannel()) {
      initPlayer();
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <Show
        when={!playlist().length}
        fallback={
          <div class="max-w-6xl mx-auto h-full">
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-4xl font-bold text-purple-600">Available Channels</h1>
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
                onClick={() => {
                  setPlaylist([]);
                  setUsername('');
                  setPassword('');
                  setSelectedChannel(null);
                  setError('');
                }}
              >
                Logout
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <For each={playlist()}>
                {(channel) => (
                  <div
                    class="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleChannelClick(channel)}
                  >
                    <img
                      src={channel.tvg.logo || '/placeholder.png'}
                      alt={channel.name}
                      class="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h2 class="text-xl font-semibold text-purple-600">{channel.name}</h2>
                    <p class="text-gray-600">{channel.group.title}</p>
                  </div>
                )}
              </For>
            </div>

            <Show when={selectedChannel()}>
              <div class="mt-8">
                <h2 class="text-2xl font-bold mb-4 text-purple-600">
                  Now Playing: {selectedChannel().name}
                </h2>
                <div class="relative" style="padding-top: 56.25%;">
                  <video
                    id="video"
                    controls
                    class="absolute top-0 left-0 w-full h-full"
                  ></video>
                </div>
              </div>
            </Show>
            <Show when={error()}>
              <p class="mt-4 text-red-500 text-center">{error()}</p>
            </Show>
          </div>
        }
      >
        <div class="flex items-center justify-center h-full">
          <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Atlas Live Pro App</h2>
            <form onSubmit={handleLogin} class="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username()}
                onInput={(e) => setUsername(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password()}
                onInput={(e) => setPassword(e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
                required
              />
              <button
                type="submit"
                class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
                  loading() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={loading()}
              >
                {loading() ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <Show when={error()}>
              <p class="mt-4 text-red-500 text-center">{error()}</p>
            </Show>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App;