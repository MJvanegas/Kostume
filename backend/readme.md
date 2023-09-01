 # KUSTOMS BACK


## Endpoint para historia de usuario número TRES:

Para visualizar el listado de productos:

      GET:    localhost:8080/api/disfraces

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
    "message": "Estos son los disfraces encontrados",
    "data": [
      {
        "id": 7,
        "code": "MCPPS7B36084B-FFC3-4D9F-BFEE-392DEBAABE30",
        "name": "Marchal clasico",
        "priceBuy": 1000,
        "rentalPrice": 500,
        "discount": 0,
        "datePurchase": "2023-08-01",
        "status": "INACTIVE",
        "detail": "Descripción del disfraz",
        "observations": "Observaciones adicionales",
        "size": "s"
      },
       ...
    ]
}
```

Para agregar una referencia:

    POST:  localhost:8080/api/referencias?categorias=categoria1&categorias=categoria2

Por form-data se agrega las key: name y photos
Y se envias las categorias por Params

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Referencia creada exitosamente",
  "data": {
    "id": 6,
    "name": "Aguacate",
    "categories": [
      {
        "id": 3,
        "name": "Infantil"
      },
      {
        "id": 2,
        "name": "Super heroes"
      }
    ]
  }
}
```

Se realizan validaciones de existencias de categorias, presencia de fotos y no duplicidad de nombre de referencia, las cuales 
se envian en un json como el siguiente:

```json
{
  "message": "Los datos ingresados para guardar la referencia no son validos.",
  "data": [
    "Error: El nombre de la referencia ya existe.",
    "Error: La categoría 'Infantil2' no existe en la base de datos."
  ]
}
```

Despues de agregar la referencia se pueden agragar los disfraces pertenecientes a esa referencia :

        POST: localhost:8080/api/disfraces

        CUERPO DE LA PETICION:
```json
{
    "nombre": "Marchal clasico",
    "precioCompra": 1000,
    "precioRenta": 500,
    "fechaCompra": "2023-08-01",
    "descripcion": "Descripción del disfraz",
    "observaciones": "Observaciones adicionales",
    "talla": "s",
    "idReference": 2,
    "diasDePrestamo": 7
}

```

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Disfraz agregado exitosamente",
  "data": {
    "id": 8,
    "code": "MCPPM88B6E0BF-2A0B-40B3-8846-0F1C975EC7F3",
    "name": "Marchal clasico",
    "priceBuy": 1000,
    "rentalPrice": 500,
    "discount": 0,
    "datePurchase": "2023-08-01",
    "status": "ACTIVE",
    "detail": "Descripción del disfraz",
    "observations": "Observaciones adicionales",
    "size": "M"
  }
}
```

## Endpoint para historia de usuario número CUATRO:

Se deben mostrar como máximo 10 productos aleatorios.

    GET: localhost:8080/api/referencias/referenciasaleatorias

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Estos son los datos de las 10 referencias generadas aleatoriamente",
  "data": [
    {
      "id": 6,
      "name": "Aguacate",
      "photos": [
        {
          "id": 16,
          "url": "http://localhost:8080/img/b6890d1e-83a9-4c84-88ff-dea66500d333.jpg"
        },
        {
          "id": 17,
          "url": "http://localhost:8080/img/99ea7893-5c04-48f5-81b4-3d3643450b92.webp"
        },
        {
          "id": 18,
          "url": "http://localhost:8080/img/1370e4b0-3b93-4383-a6e5-e6ec51b35dbc.webp"
        }
      ]
    },
    {
      "id": 5,
      "name": "Platano",
      "photos": [
        {
          "id": 13,
          "url": "http://localhost:8080/img/ca64b813-0d50-4027-bcec-ffcd099365e7.jpg"
        },
        {
          "id": 14,
          "url": "http://localhost:8080/img/ae170395-7023-415c-b548-b50b411ec4e6.webp"
        },
        {
          "id": 15,
          "url": "http://localhost:8080/img/f36bcbfc-81c9-4ac0-8481-8e200c728791.webp"
        }
      ]
    },
    {
      "id": 4,
      "name": "Mora",
      "photos": [
        {
          "id": 10,
          "url": "http://localhost:8080/img/6c7ca880-48fd-46bf-a3c3-c011bef06a52.jpg"
        },
        {
          "id": 11,
          "url": "http://localhost:8080/img/f8c027b3-e45a-4c6f-a6eb-3e81567797a3.webp"
        },
        {
          "id": 12,
          "url": "http://localhost:8080/img/f757351a-3af0-497f-8e06-48e94f013a19.webp"
        }
      ]
    },
    {
      "id": 1,
      "name": "disgraz",
      "photos": [
        {
          "id": 1,
          "url": "http://localhost:8080/img/12.jpg"
        },
        {
          "id": 2,
          "url": "http://localhost:8080/img/imagesc62356ff-d946-406d-8da5-99ac2e87deb4.webp"
        },
        {
          "id": 3,
          "url": "http://localhost:8080/img/images8a21cc66-1537-43af-960f-a6b411589882.webp"
        }
      ]
    },
    {
      "id": 3,
      "name": "Fresa",
      "photos": [
        {
          "id": 7,
          "url": "http://localhost:8080/img/magesed4fa987-72c4-4f30-be12-08366e1a27e2.jpg"
        },
        {
          "id": 8,
          "url": "http://localhost:8080/img/mages008e060b-3011-42c5-a3c7-a18b7251c41c.webp"
        },
        {
          "id": 9,
          "url": "http://localhost:8080/img/images76020b5d-d1eb-40ab-b543-cbf7edc241b5.webp"
        }
      ]
    },
    {
      "id": 2,
      "name": "Paw patrol",
      "photos": [
        {
          "id": 4,
          "url": "http://localhost:8080/img/imagesb4177944-aac1-4969-bce6-9c068d23d458.jpg"
        },
        {
          "id": 5,
          "url": "http://localhost:8080/img/imagesf0f4e283-d0ab-4f47-a886-9d544bf24e68.webp"
        },
        {
          "id": 6,
          "url": "http://localhost:8080/img/images4e5e7e04-c427-4115-870b-ba2506ab7d58.webp"
        }
      ]
    }
  ]
}
```

## Endpoint para historia de usuario número CINCO:

        GET localhost:8080/api/disfraces/reference/{idreferencia}

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Disfraces encontrados para la referencia",
  "data": [
    {
      "id": 5,
      "code": "PPEEAPPS89ABAD36-5B3A-4CA7-9018-5EA50DFB5F9B",
      "name": "Paw patrol entra en accion",
      "priceBuy": 1000,
      "rentalPrice": 500,
      "discount": 0,
      "datePurchase": "2023-08-01",
      "status": "ACTIVE",
      "detail": "Descripción del disfraz",
      "observations": "Observaciones adicionales",
      "size": "s"
    },
    {
      "id": 1,
      "code": "PPEEAPPXL9FB8D3B9-0B7B-4AC6-9D8D-3F61FB05BCFD",
      "name": "Paw patrol entra en accion",
      "priceBuy": 1000,
      "rentalPrice": 500,
      "discount": 0,
      "datePurchase": "2023-08-01",
      "status": "ACTIVE",
      "detail": "Descripción del disfraz",
      "observations": "Observaciones adicionales",
      "size": "XL"
    }
  ]
}
```

Solo trae disfraces activos , ademas solo trae un dsifraz por talla inicialmente el que no tenga observaciones y si no lo hay trae cualquiera aleatorio.


## Endpoint para ver TODA la informacion de la referencia:

     GET: localhost:8080/api/referencias/{idReferencia}


### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Estos son los datos de la eferencia consultada.",
  "data": {
    "id": 2,
    "name": "Paw patrol",
    "photos": [
      {
        "id": 4,
        "url": "http://localhost:8080/img/imagesb4177944-aac1-4969-bce6-9c068d23d458.jpg"
      },
      {
        "id": 5,
        "url": "http://localhost:8080/img/imagesf0f4e283-d0ab-4f47-a886-9d544bf24e68.webp"
      },
      {
        "id": 6,
        "url": "http://localhost:8080/img/images4e5e7e04-c427-4115-870b-ba2506ab7d58.webp"
      }
    ]
  }
}
```

olo trae un dsifraz por talla inicialmente el que no tenga observaciones y si no lo hay trae cualquiera aleatorio.


## Endpoint para ver TODA la informacion de las categorias:

     GET: localhost:8080/api/categorias


### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Lista de categorías encontrada",
  "data": [
    {
      "id": 8,
      "name": "Niño",
      "photo": "http://localhost:8080/img/e5dc093f-f936-4e6b-afa7-7f8b350092d6.jpeg"
    },
    {
      "id": 9,
      "name": "Niña",
      "photo": "http://localhost:8080/img/0cb3ced2-f9da-4b68-bc58-c3e5531d6c40.jpeg"
    },
    {
      "id": 10,
      "name": "Mujer",
      "photo": "http://localhost:8080/img/1566d51b-1c00-403c-91b2-fcc8c217710d.webp"
    },
    {
      "id": 11,
      "name": "Hombre",
      "photo": "http://localhost:8080/img/daf82e72-6d2e-4b8e-8ca5-59144f58aa41.jpeg"
    }
  ]
}
```


olo trae un dsifraz por talla inicialmente el que no tenga observaciones y si no lo hay trae cualquiera aleatorio.


## Endpoint para agregar categorias a una referencia:

     PATCH: localhost:8080/api/referencias/{idReferencia}/categorias

Este Endpoint solo permite agregar cayegorias una a una además no permite agregar categorias repetidas a la referencia

Por body se le debe enviar la siguiente información, la cual puedes obtener de VerAllCategories:

```json
{
            "id": 2,
            "name": "Niño"
 }
```

### Ejemplo de Respuesta JSON

Aquí hay un ejemplo de cómo se vería la respuesta JSON para los disfraces:

```json
{
  "message": "Se ha agregado categoria con exito",
  "data": {
    "id": 1,
    "name": "Blanca Nieves",
    "categories": [
      {
        "id": 3,
        "name": "Niña",
        "photo": "3ed68e38-6110-4919-b7e2-c3e58b957e17.jpeg"
      },
      {
        "id": 2,
        "name": "Niño",
        "photo": "7d26772b-49f8-408e-8780-88c8bb53fe68.jpeg"
      }
    ],
    "status": "ACTIVE"
  }
}
```

O mensaje de error:
```json
{
  "message": "No se pudo agregar la categoria",
  "data": "La referencia ya contiene la categoria"
}
```







 

            



