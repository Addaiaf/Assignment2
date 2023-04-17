///<reference types = "cypress"/>
let access_token = ''; 
describe('Api Tests', () => {      
     
    it('Login Test', ()=>{
       
           cy.request({
       
             method : 'POST',
             url : 'https://qacandidatetest.ensek.io/ENSEK/login',
             body: {
                "username": "test",
                "password": "testing"
             },
             form: false
       
           }).then((res)=>{
               expect(res.status).to.eq(200)   
               cy.log(JSON.stringify(res.body.access_token)) ;
               access_token = res.body.access_token;
            })
    })
    it('Reset Data', ()=>{

      cy.request({
  
        method : 'POST',
        url : 'https://qacandidatetest.ensek.io/ENSEK/reset',
        headers: {
         "Authorization": "Bearer " + access_token
        }
  
      }).then((res)=>{
          expect(res.status).to.eq(200)   
          cy.log(JSON.stringify(res))
                   
      })
    })
   
    it('get Fuel Price List',()=>{

        cy.request({
           
            method : 'GET',
            url : 'https://qacandidatetest.ensek.io/ENSEK/energy',
            headers: {
                "Authorization": "Bearer " + access_token
             },    
           form: false
        }).then((res)=>{
           expect(res.status).to.eq(200)
           //expect(res.body[0]).to.have.property('energy_id',3) 
           //expect(res.body.data).to.have.property('energy_id',3)  
           cy.log(JSON.stringify(res))

        })
    })
    it('Buy Gas', ()=>{

        cy.request({
    
          method : 'PUT',
          url : 'https://qacandidatetest.ensek.io/ENSEK/buy/energy/3/1',
          headers: {
            "Authorization": "Bearer " + access_token
         },  
          form: false
    
        })
      }) 
               
                  
      

})