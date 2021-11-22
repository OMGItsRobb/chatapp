export function getNameInitials(name) {
  const split = name.toUpperCase().split(' ');

  if (split.length === 2) {
    return split[0][0] + split[1][0];
  }
  if (split.length > 2) {
    return split[0][0] + split[split.length - 1][0];
  } else {
    return split[0][0] + split[0][1];
  }
}

export const randColorHex = () => {
  const randNum = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  return `rgb(${randNum(0, 200)}, ${randNum(0, 210)}, ${randNum(
    0,
    230
  )}), rgb(${randNum(0, 230)}, ${randNum(0, 210)}, ${randNum(0, 200)})`;
};

export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}

export function transformToArr(snapVal) {
  console.log(snapVal);
  return snapVal ? Object.keys(snapVal) : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  const updates = {};
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');

  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);

  mSnap.forEach(msgSnap => {
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  rSnap.forEach(roomSnap => {
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });
  return updates;
}
