package main

import (
	"github.com/merico-dev/lake/api"

	"github.com/merico-dev/lake/plugins"
)

func main() {
	startAPI()
}

func startAPI() {
	err := plugins.LoadPlugins(plugins.PluginDir())
	if err != nil {
		panic(err)
	}
	api.CreateApiService()
	println("Hello, lake")
}
