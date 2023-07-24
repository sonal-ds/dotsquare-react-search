export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export default interface Ce_technology {
	primaryPhoto?: ComplexImage,
	description?: string,
	name: string,
	c_activeOnAnswers?: boolean,
	c_industries?: EntityReference[],
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_technologyExpertise?: EntityReference[],
	c_technologyservices?: EntityReference[],
	keywords?: string[],
	id: string,
}
