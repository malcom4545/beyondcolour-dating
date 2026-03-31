import { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  StyleSheet, SafeAreaView, StatusBar, FlatList
} from 'react-native';

const C = {
  bg: '#FDF6F0', primary: '#C4563A', primaryDark: '#9E3E27',
  text: '#2C1810', textMuted: '#8B6055', textLight: '#C49080',
  surface: '#FAF0E8', border: '#F0D8C8', match: '#FF6B8A',
  online: '#5CB85C',
};

const profiles = [
  { id: 1, name: 'Amara', age: 27, location: 'London, UK', bio: 'Nigerian-British. Lover of Afrobeats & sunset walks.', tags: ['Afrobeats', 'Foodie', 'Travel'], online: true, initials: 'AM', color: '#C4563A' },
  { id: 2, name: 'Ravi', age: 31, location: 'Birmingham, UK', bio: 'British-Indian, software engineer by day, chef by night.', tags: ['Cooking', 'Music', 'Hiking'], online: false, initials: 'RV', color: '#2C7BB6' },
  { id: 3, name: 'Leila', age: 25, location: 'Coventry, UK', bio: 'Iranian-British. Artist and dreamer.', tags: ['Art', 'Poetry', 'Coffee'], online: true, initials: 'LE', color: '#7D3C98' },
  { id: 4, name: 'Marcus', age: 29, location: 'Manchester, UK', bio: 'Jamaican heritage, Manchester raised. Music producer.', tags: ['Music', 'Films', 'Gym'], online: true, initials: 'MA', color: '#1E8449' },
];

const matchList = [
  { id: 1, name: 'Amara', age: 27, matchPercent: 94, online: true, initials: 'AM', color: '#C4563A', lastSeen: 'now', unread: 2 },
  { id: 2, name: 'Leila', age: 25, matchPercent: 88, online: true, initials: 'LE', color: '#7D3C98', lastSeen: '5m ago', unread: 0 },
  { id: 3, name: 'Sofia', age: 28, matchPercent: 82, online: false, initials: 'SO', color: '#E67E22', lastSeen: '2h ago', unread: 1 },
];

const initMsgs = [
  { id: 1, from: 'them', text: 'Hey! I loved your profile!', time: '10:24 AM' },
  { id: 2, from: 'me', text: 'Thank you! How are you?', time: '10:26 AM' },
  { id: 3, from: 'them', text: 'Great! Want to grab coffee sometime?', time: '10:27 AM' },
];

function Avatar({ initials, color, size = 52, online = false }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ color: '#fff', fontSize: size * 0.3, fontWeight: '700' }}>{initials}</Text>
      {online && <View style={{ position: 'absolute', bottom: 1, right: 1, width: size * 0.24, height: size * 0.24, borderRadius: 99, backgroundColor: C.online, borderWidth: 2, borderColor: '#fff' }} />}
    </View>
  );
}

function LoginScreen({ onLogin, goRegister }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ backgroundColor: C.primaryDark, padding: 48, alignItems: 'center' }}>
        <Text style={{ fontSize: 52, marginBottom: 8 }}>💕</Text>
        <Text style={{ fontSize: 26, fontWeight: '700', color: '#fff' }}>Beyond Colour</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginTop: 4 }}>Where your story meets someone who understands it</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: C.text, marginBottom: 24 }}>Welcome back ✨</Text>
        <Text style={s.label}>Email</Text>
        <TextInput value={email} onChangeText={setEmail} placeholder="your@email.com" keyboardType="email-address" autoCapitalize="none" style={s.input} />
        <Text style={[s.label, { marginTop: 14 }]}>Password</Text>
        <TextInput value={pass} onChangeText={setPass} placeholder="Password" secureTextEntry style={s.input} />
        <TouchableOpacity onPress={onLogin} style={[s.btn, { marginTop: 28 }]}>
          <Text style={s.btnTxt}>Sign In</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: C.textMuted }}>No account? </Text>
          <TouchableOpacity onPress={goRegister}><Text style={{ color: C.primary, fontWeight: '600' }}>Join free</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RegisterScreen({ onRegister, goLogin }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ backgroundColor: C.primaryDark, padding: 32 }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#fff' }}>Create your story 🌍</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text style={s.label}>Your Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="What should we call you?" style={s.input} />
        <Text style={[s.label, { marginTop: 16 }]}>I am a...</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {['Man', 'Woman', 'Non-binary', 'Couple'].map(g => (
            <TouchableOpacity key={g} onPress={() => setGender(g)} style={{ paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 2, borderColor: gender === g ? C.primary : C.border, backgroundColor: gender === g ? C.primary : '#fff' }}>
              <Text style={{ color: gender === g ? '#fff' : C.text }}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={onRegister} style={[s.btn, { marginTop: 32 }]}>
          <Text style={s.btnTxt}>Create My Profile 💕</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: C.textMuted }}>Have an account? </Text>
          <TouchableOpacity onPress={goLogin}><Text style={{ color: C.primary, fontWeight: '600' }}>Sign in</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function DiscoverScreen() {
  const [idx, setIdx] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const p = profiles[idx % profiles.length];
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: C.text }}>Discover 🌍</Text>
        <Text style={{ color: C.textMuted, fontSize: 13 }}>Near Coventry</Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 24, overflow: 'hidden', elevation: 6 }}>
          <View style={{ backgroundColor: p.color, height: 210, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 72, fontWeight: '700', color: 'rgba(255,255,255,0.9)' }}>{p.initials}</Text>
            {p.online && <View style={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(92,184,92,0.9)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}><Text style={{ color: '#fff', fontSize: 11 }}>● Online</Text></View>}
          </View>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
              <Text style={{ fontSize: 22, fontWeight: '700', color: C.text }}>{p.name}</Text>
              <Text style={{ fontSize: 18, color: C.textMuted }}>{p.age}</Text>
            </View>
            <Text style={{ fontSize: 13, color: C.textMuted, marginBottom: 10 }}>📍 {p.location}</Text>
            <Text style={{ fontSize: 14, color: C.text, lineHeight: 22, marginBottom: 14 }}>{p.bio}</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
              {p.tags.map(t => <View key={t} style={{ paddingHorizontal: 12, paddingVertical: 5, borderRadius: 16, backgroundColor: C.surface, borderWidth: 1.5, borderColor: C.border }}><Text style={{ fontSize: 12, color: C.textMuted }}>#{t}</Text></View>)}
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 24, paddingBottom: 24 }}>
            <TouchableOpacity onPress={() => setIdx(i => i + 1)} style={{ width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: C.border, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 24 }}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowMatch(true)} style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: C.match, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 24 }}>❤️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showMatch && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.75)', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 24, padding: 32, alignItems: 'center', width: '100%' }}>
            <Text style={{ fontSize: 52, marginBottom: 8 }}>💕</Text>
            <Text style={{ fontSize: 26, fontWeight: '700', color: C.primary, marginBottom: 8 }}>It's a Match!</Text>
            <Text style={{ fontSize: 15, color: C.textMuted, textAlign: 'center', marginBottom: 24 }}>You and {p.name} liked each other!</Text>
            <TouchableOpacity onPress={() => { setShowMatch(false); setIdx(i => i + 1); }} style={[s.btn, { width: '100%' }]}>
              <Text style={s.btnTxt}>Keep Discovering 🎉</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

function MatchesScreen({ onChat }) {
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: C.bg }}
      ListHeaderComponent={<View style={{ padding: 16 }}><Text style={{ fontSize: 22, fontWeight: '700', color: C.text }}>Your Matches 💕</Text><Text style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>{matchList.length} people liked you back</Text></View>}
      data={matchList}
      keyExtractor={i => i.id.toString()}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item: m }) => (
        <TouchableOpacity onPress={() => onChat(m)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border }}>
          <Avatar initials={m.initials} color={m.color} size={52} online={m.online} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: C.text }}>{m.name}, {m.age}</Text>
              <Text style={{ fontSize: 11, color: C.textLight }}>{m.lastSeen}</Text>
            </View>
            <Text style={{ fontSize: 13, color: m.unread ? C.text : C.textMuted, fontWeight: m.unread ? '600' : '400' }}>
              {m.unread ? `${m.unread} new message(s) 💬` : 'Tap to say hello! 👋'}
            </Text>
          </View>
          <Text style={{ color: C.primary, fontWeight: '700', fontSize: 13 }}>{m.matchPercent}%</Text>
        </TouchableOpacity>
      )}
    />
  );
}

function ChatScreen({ match, onBack }) {
  const [msgs, setMsgs] = useState(initMsgs);
  const [input, setInput] = useState('');
  const send = () => {
    if (!input.trim()) return;
    setMsgs(m => [...m, { id: Date.now(), from: 'me', text: input, time: 'now' }]);
    setInput('');
    setTimeout(() => setMsgs(m => [...m, { id: Date.now() + 1, from: 'them', text: 'That sounds wonderful! 😊', time: 'now' }]), 1200);
  };
  return (
    <View style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: C.border }}>
        <TouchableOpacity onPress={onBack}><Text style={{ fontSize: 26, color: C.primary }}>←</Text></TouchableOpacity>
        <Avatar initials={match.initials} color={match.color} size={44} online={match.online} />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: C.text }}>{match.name}</Text>
          <Text style={{ fontSize: 12, color: match.online ? C.online : C.textLight }}>{match.online ? '● Online' : `Last seen ${match.lastSeen}`}</Text>
        </View>
      </View>
      <FlatList data={msgs} keyExtractor={i => i.id.toString()} contentContainerStyle={{ padding: 16 }}
        renderItem={({ item: msg }) => (
          <View style={{ flexDirection: msg.from === 'me' ? 'row-reverse' : 'row', marginBottom: 10, alignItems: 'flex-end', gap: 8 }}>
            {msg.from === 'them' && <Avatar initials={match.initials} color={match.color} size={28} />}
            <View style={{ maxWidth: '72%', padding: 12, borderRadius: 18, backgroundColor: msg.from === 'me' ? C.primary : '#fff' }}>
              <Text style={{ color: msg.from === 'me' ? '#fff' : C.text, fontSize: 14 }}>{msg.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', gap: 10, padding: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border }}>
        <TextInput value={input} onChangeText={setInput} placeholder="Say something beautiful..." style={{ flex: 1, padding: 12, borderRadius: 24, borderWidth: 1.5, borderColor: C.border, backgroundColor: C.surface, fontSize: 14 }} />
        <TouchableOpacity onPress={send} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: input.trim() ? C.primary : C.border, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ProfileScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }}>
      <View style={{ backgroundColor: C.primaryDark, padding: 40, alignItems: 'center' }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: '#fff' }}>ME</Text>
        </View>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#fff' }}>Your Profile</Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>📍 Coventry, UK</Text>
      </View>
      <View style={{ flexDirection: 'row', margin: 16, gap: 10 }}>
        {[['12', 'Matches'], ['48', 'Likes'], ['3', 'Chats']].map(([n, l]) => (
          <View key={l} style={{ flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1.5, borderColor: C.border }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: C.primary }}>{n}</Text>
            <Text style={{ fontSize: 12, color: C.textMuted }}>{l}</Text>
          </View>
        ))}
      </View>
      {[['🔔', 'Notifications'], ['🔒', 'Privacy'], ['💳', 'Go Premium'], ['🚪', 'Sign Out']].map(([icon, label]) => (
        <TouchableOpacity key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginHorizontal: 16, marginBottom: 8, padding: 16, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: C.border }}>
          <Text style={{ fontSize: 20 }}>{icon}</Text>
          <Text style={{ flex: 1, fontSize: 15, color: label === 'Sign Out' ? '#e74c3c' : C.text }}>{label}</Text>
          <Text style={{ color: C.textLight, fontSize: 18 }}>›</Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

function NavBar({ tab, setTab }) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: C.border, paddingBottom: 4 }}>
      {[{ id: 'discover', icon: '🔍', label: 'Discover' }, { id: 'matches', icon: '💕', label: 'Matches' }, { id: 'profile', icon: '👤', label: 'Profile' }].map(t => (
        <TouchableOpacity key={t.id} onPress={() => setTab(t.id)} style={{ flex: 1, paddingVertical: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 22 }}>{t.icon}</Text>
          <Text style={{ fontSize: 10, color: tab === t.id ? C.primary : C.textLight, fontWeight: tab === t.id ? '700' : '400' }}>{t.label}</Text>
          {tab === t.id && <View style={{ width: 20, height: 2, backgroundColor: C.primary, borderRadius: 1, marginTop: 2 }} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function App() {
  const [screen, setScreen] = useState('login');
  const [tab, setTab] = useState('discover');
  const [chatMatch, setChatMatch] = useState(null);
  const openChat = (match) => { setChatMatch(match); setTab('chat'); };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bg} />
      {screen === 'login' && <LoginScreen onLogin={() => setScreen('app')} goRegister={() => setScreen('register')} />}
      {screen === 'register' && <RegisterScreen onRegister={() => setScreen('app')} goLogin={() => setScreen('login')} />}
      {screen === 'app' && (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {tab === 'discover' && <DiscoverScreen />}
            {tab === 'matches' && <MatchesScreen onChat={openChat} />}
            {tab === 'chat' && chatMatch && <ChatScreen match={chatMatch} onBack={() => setTab('matches')} />}
            {tab === 'profile' && <ProfileScreen />}
          </View>
          {tab !== 'chat' && <NavBar tab={tab} setTab={setTab} />}
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  label: { fontSize: 12, color: '#8B6055', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 },
  input: { padding: 14, borderRadius: 12, borderWidth: 2, borderColor: '#F0D8C8', backgroundColor: '#FAF0E8', fontSize: 15, color: '#2C1810' },
  btn: { padding: 16, borderRadius: 14, backgroundColor: '#C4563A', alignItems: 'center' },
  btnTxt: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
