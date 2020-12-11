package retrieve

import (
	"fmt"
	"os"

	RetrieveUsecase "github.com/moki/moki.codes/pkg/server/newsletter/usecase/retrieve"
)

type presenter struct {
}

// New - instantiates http post presenter
func New() RetrieveUsecase.OutputPort {
	return &presenter{}
}

func (p *presenter) Present(response *RetrieveUsecase.Response) {
	if !response.Success || len(response.Subs) == 0 {
		fmt.Fprintf(os.Stderr, "failed to retrieve subscribers\n")

		return
	}

	for _, sub := range response.Subs {
		fmt.Println("name: ", sub.Name)
		fmt.Println("email: ", sub.Email)
		fmt.Printf("%v\n", sub)
	}
}
