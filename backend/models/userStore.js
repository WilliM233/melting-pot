const users = new Map();

export function findOrCreateUser(profile) {
  let user = users.get(profile.id);
  if (!user) {
    user = {
      id: profile.id,
      name: profile.displayName,
      email: profile.emails?.[0]?.value,
      photo: profile.photos?.[0]?.value,
    };
    users.set(profile.id, user);
  }
  return user;
}

export function getUserById(id) {
  console.log("getUserById called with:", id);
  const user = users.get(id);
  console.log("Found user:", user);
  return user;
}