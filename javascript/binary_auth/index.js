const AUTH_ENUM = {
  READ: 0x01,
  CREATE: 0x02,
  UPDATE: 0x03,
  DELETE: 0x04,
  TEST: 0x05,
}

console.log(parseInt(AUTH_ENUM.DELETE | AUTH_ENUM.READ))

console.log((5 & AUTH_ENUM.READ) === AUTH_ENUM.READ)
console.log((5 ^ AUTH_ENUM.READ).toString(2))
console.log(AUTH_ENUM.READ & 1)
