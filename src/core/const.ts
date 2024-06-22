export const connectObject = `
{
  type: 'connect',
  host: 'host-url.domain',
  key: 'secrect-key',
}
`.trim();

export const reqObject = `
{
  key: 'secrect-key',
  data: 'scanned-data'
  sender: 'ZaloName'
}
`.trim();

export const respObject = `
{
  error_code: 0, // success
  data: {
    field1: 'data1',
    field2: 'data2',
    fieldN: 'dataN',
  }
}
`.trim();
