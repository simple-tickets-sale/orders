{{define "mongoURI"}}
- name: MONGO_URI
  value: mongodb://{{.Release.Name}}{{.Values.orders.env.MONGO_URI}}
{{end}}