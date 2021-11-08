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

export const randColorHex = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export function transformToArrWithId(snapVal) {
  return snapVal
    ? Object.keys(snapVal).map(roomId => {
        return { ...snapVal[roomId], id: roomId };
      })
    : [];
}
