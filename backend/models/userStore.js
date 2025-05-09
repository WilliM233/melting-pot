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
  console.log("getUserById called with:", id);
  return users[id]; // or however you store users
}