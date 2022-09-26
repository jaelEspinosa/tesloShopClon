# Next.js TesloShop App

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```

* El -d, significa __detached__


* MongoDB URL Local:
```
mongodb://localhost:2017/teslodb
```


## configurar las variables de entorno

Renombrar el archivo __.env.template__ a __.env__



## Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```

## Llenar la DB con datos de prueba

## Llamar:
```
http://localhost:3000/api/seed
```


