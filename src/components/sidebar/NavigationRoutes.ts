export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/instances',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'instances',
      displayName: 'menu.instances',
      meta: {
        icon: 'developer_board',
      },
    },
    {
      name: 'networks',
      displayName: 'menu.networks',
      meta: {
        icon: 'multiple_stop',
      },
    },
    {
      name: 'keypairs',
      displayName: 'menu.keypairs',
      meta: {
        icon: 'vpn_key',
      },
    },
    {
      name: 'tools',
      displayName: 'menu.tools',
      meta: {
        icon: 'widgets',
      },
      children: [
        {
          name: 'tools-dialog',
          displayName: 'menu.tools-dialog',
        },
      ],
    },
    {
      name: 'payments',
      displayName: 'menu.payments',
      meta: {
        icon: 'credit_card',
      },
      children: [
        {
          name: 'payment-methods',
          displayName: 'menu.payment-methods',
        },
        {
          name: 'pricing-plans',
          displayName: 'menu.pricing-plans',
        },
        {
          name: 'billing',
          displayName: 'menu.billing',
        },
      ],
    },
  ] as INavigationRoute[],
}
