{{define "mongoURI"}}
- name: MONGO_URI
  value: mongodb://{{.Values.orders.env.mongo.USERNAME}}:{{.Values.orders.env.mongo.PASSWORD}}@{{.Release.Name}}{{.Values.orders.env.mongo.MONGO_URI}}
{{end}}