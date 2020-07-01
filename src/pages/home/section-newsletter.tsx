import { h, Fragment } from "preact";
import {
        Card,
        CardMedia,
        CardHeader,
        CardBody,
        CardActions
} from "src/components/card";
import { Section } from "src/components/section";
import { Button } from "src/components/button";
import { TextField } from "src/components/textfield";

import { useState } from "preact/hooks";

export function NewsletterForm() {
        const valname = (input: string) =>
                /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(input);
        const valemail = (input: string) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);

        const [name, setName] = useState("");
        const [nameValidness, setNameValidness] = useState(false);
        const [email, setEmail] = useState("");
        const [emailValidness, setEmailValidness] = useState(false);

        const submitable = emailValidness && nameValidness;

        function handleSubmit(e: Event) {
                if (!submitable) return;
                e.preventDefault();
                // TODO: handle form submit
                console.log(name, email);
        }

        return (
                <Fragment>
                        <form
                                id="newsletter"
                                autocomplete="off"
                                class="card__body section-newsletter__body form"
                                onSubmit={handleSubmit}
                        >
                                <TextField
                                        id="name"
                                        label="name"
                                        valfn={valname}
                                        updateValue={setName}
                                        updateValid={setNameValidness}
                                        type="text"
                                />
                                <TextField
                                        id="email"
                                        label="email"
                                        valfn={valemail}
                                        updateValue={setEmail}
                                        updateValid={setEmailValidness}
                                        type="email"
                                />
                        </form>
                        <CardActions>
                                <Button
                                        form="newsletter"
                                        disabled={!submitable}
                                        appearance="outlined"
                                        classes="section-newsletter__action"
                                        type="submit"
                                >
                                        subscribe
                                </Button>
                        </CardActions>
                </Fragment>
        );
}

const Title = <div class="section-newsletter__title">Newsletter</div>;
const Subtitle = (
        <div class="section-newsletter__subtitle">
                Receive updates via email
        </div>
);

export function SectionNewsletter() {
        return (
                <Section classes="section-newsletter">
                        <Card elevation={1}>
                                <CardHeader
                                        classes="section-newsletter__header"
                                        elevation={1}
                                >
                                        {Title}
                                        {Subtitle}
                                </CardHeader>
                                <NewsletterForm />
                        </Card>
                </Section>
        );
}
