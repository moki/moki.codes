import { h, Fragment } from "preact";
import {
        Card,
        CardMedia,
        CardHeader,
        CardBody,
        CardActions,
} from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { TextField } from "src/components/textfield";
import { SnackbarContext, Snackbar } from "src/components/snackbar";

import { useState, useEffect, useContext } from "preact/hooks";

const section_class = "bmV3c2xldHRlcgo";

type NewsletterFormProps = {
        endpoint: string;
};

const valname = (input: string) =>
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(input);
const valemail = (input: string) =>
        // /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        /^[^\s@!#$%&'*]+@[^\s@!#$%&'*]+\.[^\s@!#$%&'*]+$/.test(input);

export function NewsletterForm({ endpoint }: NewsletterFormProps) {
        const { addSnack } = useContext(SnackbarContext);

        const [name, setName] = useState("");
        const [nameValidness, setNameValidness] = useState(false);
        const [email, setEmail] = useState("");
        const [emailValidness, setEmailValidness] = useState(false);

        let submitable = emailValidness && nameValidness;

        function handleSubmit(e: Event) {
                const submitable = emailValidness && nameValidness;
                if (!submitable) return;
                e.preventDefault();

                const request = new XMLHttpRequest();
                const data = {
                        name,
                        email,
                };

                setName("");
                setEmail("");
                setEmailValidness(false);
                setNameValidness(false);

                request.open("POST", endpoint);
                request.send(JSON.stringify(data));

                request.addEventListener("load", () => {
                        const status = request.status;
                        let message = "";

                        switch (status) {
                                case 201:
                                        message = "thanks for subscribing";
                                        break;
                                case 409:
                                        message = "already subscribed";
                                        break;
                                default:
                                        message = "¯_(ツ)_/¯";
                        }

                        addSnack({ message, type: "default" });
                });

                request.addEventListener("error", () => {
                        addSnack({ message: "¯_(ツ)_/¯", type: "default" });
                });
        }

        useEffect(() => {
                submitable = emailValidness && nameValidness;
        }, [name, email]);

        return (
                <Fragment>
                        <form
                                id="bmV3c2xldHRlcgo"
                                autocomplete="off"
                                class="card__body section-bmV3c2xldHRlcgo__body form"
                                onSubmit={handleSubmit}
                        >
                                <TextField
                                        value={name}
                                        id="name"
                                        label="name"
                                        valfn={valname}
                                        updateValue={setName}
                                        updateValid={setNameValidness}
                                        type="text"
                                />
                                <TextField
                                        value={email}
                                        id="email"
                                        label="email"
                                        valfn={valemail}
                                        updateValue={setEmail}
                                        updateValid={setEmailValidness}
                                        type="email"
                                />
                        </form>
                        <CardActions classes="section-bmV3c2xldHRlcgo__actions">
                                <Button
                                        form="bmV3c2xldHRlcgo"
                                        disabled={!submitable}
                                        appearance="outlined"
                                        classes="section-bmV3c2xldHRlcgo__action"
                                        type="submit"
                                >
                                        subscribe
                                </Button>
                        </CardActions>
                </Fragment>
        );
}

const Title = <div class="section-bmV3c2xldHRlcgo__title">Newsletter</div>;
const Subtitle = (
        <div class="section-bmV3c2xldHRlcgo__subtitle">
                Receive updates via email
        </div>
);

export function SectionNewsletter() {
        return (
                <Section classes="section-bmV3c2xldHRlcgo">
                        <Card elevation={1}>
                                <CardHeader
                                        classes="section-bmV3c2xldHRlcgo__header"
                                        elevation={1}
                                >
                                        {Title}
                                        {Subtitle}
                                </CardHeader>
                                <NewsletterForm endpoint="/api/newsletter/subscribe" />
                        </Card>
                </Section>
        );
}
