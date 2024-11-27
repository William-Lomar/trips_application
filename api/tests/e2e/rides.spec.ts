it('As rotas devem responder com sucesso', async () => {
    const customer_id = "william_teste";
    const origin = "1600 Amphitheatre Parkway, Mountain View, CA";
    const destination = "450 Serra Mall, Stanford, CA 94305, USA";

    const estimateInput = {
        customer_id,
        origin,
        destination
    }

    const res = await fetch('http://localhost:8080/ride/estimate', { method: 'POST', body: JSON.stringify(estimateInput), headers: { "Content-Type": "application/json" } })
    const estimated = await res.json()

    const driver = estimated.options[0];
    const confirm = {
        customer_id,
        origin,
        destination,
        distance: estimated.distance,
        duration: estimated.duration,
        driver: {
            id: driver.id,
            name: driver.name
        },
        value: driver.value
    }

    await fetch('http://localhost:8080/ride/confirm', { method: 'PATCH', body: JSON.stringify(confirm), headers: { "Content-Type": "application/json" } })


    const res2 = await fetch(`http://localhost:8080/ride/${customer_id}`, { method: 'GET', headers: { "Content-Type": "application/json" } })
    const infoRides = await res2.json();
    
    expect(infoRides.rides.length).toBeGreaterThan(0);
})
