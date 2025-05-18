export const vendorTreeData = [
  {
    name: 'Cloud Service Providers',
    value: 850,
    children: [
      {
        name: 'AWS',
        value: 500,
        itemStyle: { color: '#ff6b6b' }
      },
      {
        name: 'Azure',
        value: 250,
        itemStyle: { color: '#ffd93d' }
      },
      {
        name: 'GCP',
        value: 100,
        itemStyle: { color: '#6c5ce7' }
      }
    ]
  },
  {
    name: 'Software Vendors',
    value: 600,
    children: [
      {
        name: 'Microsoft',
        value: 200,
        itemStyle: { color: '#ffd93d' }
      },
      {
        name: 'Oracle',
        value: 150,
        itemStyle: { color: '#ff6b6b' }
      },
      {
        name: 'SAP',
        value: 250,
        itemStyle: { color: '#ff4757' }
      }
    ]
  },
  {
    name: 'Security Services',
    value: 400,
    children: [
      {
        name: 'Cloudflare',
        value: 150,
        itemStyle: { color: '#ffd93d' }
      },
      {
        name: 'Akamai',
        value: 120,
        itemStyle: { color: '#6c5ce7' }
      },
      {
        name: 'Fastly',
        value: 130,
        itemStyle: { color: '#ffd93d' }
      }
    ]
  },
  {
    name: 'Hardware Suppliers',
    value: 300,
    children: [
      {
        name: 'Cisco',
        value: 150,
        itemStyle: { color: '#ff6b6b' }
      },
      {
        name: 'Dell',
        value: 100,
        itemStyle: { color: '#ffd93d' }
      },
      {
        name: 'HP',
        value: 50,
        itemStyle: { color: '#6c5ce7' }
      }
    ]
  }
];

export const graphNodes = [
  {
    id: '0',
    name: 'Enterprise',
    symbolSize: 80,
    category: 'Enterprise',
    itemStyle: {
      color: '#4834d4'
    }
  },
  // Cloud Providers
  {
    id: '1',
    name: 'AWS',
    symbolSize: 50,
    category: 'Cloud Provider',
    itemStyle: { color: '#ff6b6b' },
    value: 'High'
  },
  {
    id: '2',
    name: 'Azure',
    symbolSize: 40,
    category: 'Cloud Provider',
    itemStyle: { color: '#ff6b6b' },
    value: 'Medium'
  },
  // Software Vendors
  {
    id: '3',
    name: 'Microsoft',
    symbolSize: 45,
    category: 'Software Vendor',
    itemStyle: { color: '#ffd93d' },
    value: 'Medium'
  },
  {
    id: '4',
    name: 'Oracle',
    symbolSize: 40,
    category: 'Software Vendor',
    itemStyle: { color: '#ffd93d' },
    value: 'High'
  },
  // Security Services
  {
    id: '5',
    name: 'Cloudflare',
    symbolSize: 35,
    category: 'Security Service',
    itemStyle: { color: '#6c5ce7' },
    value: 'Medium'
  },
  {
    id: '6',
    name: 'Akamai',
    symbolSize: 35,
    category: 'Security Service',
    itemStyle: { color: '#6c5ce7' },
    value: 'Low'
  },
  // Hardware Suppliers
  {
    id: '7',
    name: 'Cisco',
    symbolSize: 40,
    category: 'Hardware Supplier',
    itemStyle: { color: '#a8e6cf' },
    value: 'High'
  },
  {
    id: '8',
    name: 'Dell',
    symbolSize: 35,
    category: 'Hardware Supplier',
    itemStyle: { color: '#a8e6cf' },
    value: 'Medium'
  }
];

export const graphLinks = [
  // Direct connections to Enterprise
  { source: '1', target: '0', lineStyle: { width: 3 } },
  { source: '2', target: '0', lineStyle: { width: 2 } },
  { source: '3', target: '0', lineStyle: { width: 3 } },
  { source: '4', target: '0', lineStyle: { width: 2 } },
  { source: '5', target: '0', lineStyle: { width: 2 } },
  { source: '6', target: '0', lineStyle: { width: 2 } },
  { source: '7', target: '0', lineStyle: { width: 3 } },
  { source: '8', target: '0', lineStyle: { width: 2 } },
  // Cross-vendor relationships
  { source: '1', target: '5', lineStyle: { width: 1 } },
  { source: '2', target: '3', lineStyle: { width: 1 } },
  { source: '7', target: '6', lineStyle: { width: 1 } },
  { source: '3', target: '4', lineStyle: { width: 1 } },
  { source: '5', target: '6', lineStyle: { width: 1 } }
];
