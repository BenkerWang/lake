package main // must be main for plugin entry point

import (
	"github.com/merico-dev/lake/logger" // A pseudo type for Plugin Interface implementation
	"github.com/merico-dev/lake/plugins/github/tasks"
	"github.com/merico-dev/lake/utils"
)

type Github string

func (plugin Github) Description() string {
	return "To collect and enrich data from GitHub"
}

func (plugin Github) Execute(options map[string]interface{}, progress chan<- float32) {
	// We need this rate limit set to 1 since there are only 5000 requests per hour allowed for the github api
	scheduler, err := utils.NewWorkerScheduler(50, 1)
	if err != nil {
		logger.Error("could not create scheduler", false)
	}

	defer scheduler.Release()

	logger.Print("start github plugin execution")

	owner, ok := options["owner"]
	if !ok {
		logger.Print("owner is required for GitHub execution")
		return
	}
	ownerString := owner.(string)

	repositoryName, ok := options["repositoryName"]
	if !ok {
		logger.Print("repositoryName is required for GitHub execution")
		return
	}
	repositoryNameString := repositoryName.(string)

	repoId, collectRepoErr := tasks.CollectRepository(ownerString, repositoryNameString)
	if collectRepoErr != nil {
		logger.Error("Could not collect repositories: ", collectRepoErr)
		return
	}

	collectCommitsErr := tasks.CollectCommits(ownerString, repositoryNameString, repoId, scheduler)
	if collectCommitsErr != nil {
		logger.Error("Could not collect commits: ", collectCommitsErr)
		return
	}
	tasks.CollectChildrenOnCommits(ownerString, repositoryNameString, repoId, scheduler)

	collectIssuesErr := tasks.CollectIssues(ownerString, repositoryNameString, repoId, scheduler)
	if collectIssuesErr != nil {
		logger.Error("Could not collect issues: ", collectIssuesErr)
		return
	}

	tasks.CollectChildrenOnPullRequests(ownerString, repositoryNameString, repoId, scheduler)

	progress <- 1

	close(progress)

}

func (plugin Github) RootPkgPath() string {
	return "github.com/merico-dev/lake/plugins/github"
}

// Export a variable named PluginEntry for Framework to search and load
var PluginEntry Github //nolint
