import React from 'react';
import DashLayout from '../../components/Layout/DashboardLayout';
import Products from '../../components/Screens/Products/Products';
function products() {
    return (
      <DashLayout>

        <Products/>
      </DashLayout>
    );
}

export default products;

/*export async function getServerSideProps() {
    var username = process.env.API_USERNAME;
    var pass = process.env.API_PASSWORD;
    let authString = `${username}:${pass}`;
    let headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(authString));
  
    const res = await fetch(
      "https://primeries.myshopify.com//admin/api/2022-04/orders.json?status=closed",
      {
        method: "GET",
        headers: headers,
      }
    );
    
    return {
      props: {
        data: await res.json(),
      },
    };
}
// let user =getFromLocalStorage('user')||null;
// export async function getServerSideProps() {
//   if (user==null)
  
//     return {
//       props: {},
//       redirect:{
//         destination:'/login',
//         permanent:false
//       }
      
//     };
//     //console.log(user)
  

//   return {
//     props: {
//       user,
//     },

//   };
// }







*/