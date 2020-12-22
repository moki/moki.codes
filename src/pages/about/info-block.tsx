import { h } from "preact";

export type InfoBlockProps = JSX.IntrinsicElements & {
        children?: JSX.Element | JSX.Element[];
};

export function InfoBlock({ children, ...rest }: InfoBlockProps) {
        const [header, ...childTail] = Array.isArray(children)
                ? children
                : [children];
        return (
                <div class="info-block" {...rest}>
                        {header}
                        <div class="info-block__content">{childTail}</div>
                </div>
        );
}

export type InfoBlockHeaderProps = JSX.IntrinsicElements & {
        id?: string;
        children?: JSX.Element | JSX.Element[];
};

export function InfoBlockHeader({
        id = "",
        children,
        ...rest
}: InfoBlockHeaderProps) {
        const InfoBlockHeaderIcon = (
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                        class="info-block-header__icon"
                >
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"></path>
                </svg>
        );

        return (
                <a class="info-block__header" {...rest} id={id}>
                        <div class="info-block-header__text">{children}</div>
                        {InfoBlockHeaderIcon}
                </a>
        );
}

export type InfoBlockItemProps = JSX.IntrinsicElements & {
        children: JSX.Element | JSX.Element[];
};

export function InfoBlockItem({ children, ...rest }: InfoBlockItemProps) {
        return (
                <div class="info-block__item" {...rest}>
                        {children}
                </div>
        );
}

export type InfoBlockItemTitleProps = JSX.IntrinsicElements & {
        children: JSX.Element | JSX.Element[];
};

export function InfoBlockItemTitle({
        children,
        ...rest
}: InfoBlockItemTitleProps) {
        return (
                <div class="info-block-item__title" {...rest}>
                        {children}
                </div>
        );
}

export type InfoBlockItemSubtitleProps = JSX.IntrinsicElements & {
        children: JSX.Element | JSX.Element[];
};

export function InfoBlockItemSubtitle({
        children,
        ...rest
}: InfoBlockItemSubtitleProps) {
        return (
                <div class="info-block-item__subtitle" {...rest}>
                        {children}
                </div>
        );
}

export type InfoBlockItemBodyProps = JSX.IntrinsicElements & {
        children: JSX.Element | JSX.Element[];
};

export function InfoBlockItemBody({
        children,
        ...rest
}: InfoBlockItemBodyProps) {
        return (
                <div class="info-block-item__body" {...rest}>
                        {children}
                </div>
        );
}

export type InfoBlockContainerProps = JSX.IntrinsicElements & {
        title: string;
        items: { title: string; subtitle: string; body: string }[];
};

export function InfoBlockContainer({ title, items }: InfoBlockContainerProps) {
        const laststyle = (next: string) => (!next ? "padding-bottom:0;" : "");
        const id = title.split(" ").join("-");
        const mixin = id
                ? {
                          onClick: (e: Event) => {
                                  e.preventDefault();
                                  window.location.hash = `#${id}`;
                          }
                  }
                : {};
        return (
                <InfoBlock>
                        <InfoBlockHeader id={id} {...mixin}>
                                {title}
                        </InfoBlockHeader>
                        {items.map(item => (
                                <InfoBlockItem>
                                        <InfoBlockItemTitle
                                                style={laststyle(item.subtitle)}
                                        >
                                                {item.title}
                                        </InfoBlockItemTitle>
                                        <InfoBlockItemSubtitle
                                                style={laststyle(item.body)}
                                        >
                                                {item.subtitle}
                                        </InfoBlockItemSubtitle>
                                        <InfoBlockItemBody>
                                                {item.body}
                                        </InfoBlockItemBody>
                                </InfoBlockItem>
                        ))}
                </InfoBlock>
        );
}
