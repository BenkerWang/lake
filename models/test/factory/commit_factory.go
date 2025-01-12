package factory

import (
	"time"

	"github.com/merico-dev/lake/models/domainlayer/code"
)

func CreateCommit() (*code.Commit, error) {
	commit := &code.Commit{
		Sha:            "dosifj9302hf80h23f",
		Additions:      RandInt(),
		Deletions:      RandInt(),
		DevEq:          RandInt(),
		Message:        "",
		AuthorName:     "",
		AuthorEmail:    "",
		AuthoredDate:   time.Now(),
		CommitterName:  "",
		CommitterEmail: "",
		CommittedDate:  time.Now(),
	}
	return commit, nil
}
