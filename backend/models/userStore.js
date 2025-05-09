const users = new Map();

export function findOrCreateUser(profile) {
  const id = profile.id || profile.sub;
  if (!users.has(id)) {
    const user = {
      id,
      name: profile.displayName || 'Anonymous',
      email: profile.emails?.[0]?.value || null,
    };
    users.set(id, user);
  }
  return users.get(id);
}

export function getUserById(id) {
  return users[id]; // or however you store users
}