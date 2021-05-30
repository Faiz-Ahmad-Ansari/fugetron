import { Table } from './Components/Table';
import { Record } from './Components/Table';

const routes = [
    {
      path:'/',
      name: 'Table',
      component: Table,
      exact: true,    
    },
    {
      path:'/Record',
      name: 'Record',
      component: Record,
      exact: false,    
    }
  ]

  export default routes ;