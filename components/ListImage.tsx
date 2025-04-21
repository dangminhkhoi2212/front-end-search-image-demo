import Image from "next/image";
import React from "react";

export type TImage = {
	filename: string;
	score: number;
	id: string;
	image_url: string;
};
type Props = { images: TImage[]; loading: boolean };

const ListImage: React.FC<Props> = ({ images, loading }) => {
	if (loading) {
		return <div>Loading...</div>;
	}
	return (
		<div className="grid grid-cols-4 gap-4 text-gray-900">
			{images?.map((img) => (
				<div className="col-span-1 flex flex-col gap-4" key={img.id}>
					<div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden">
						<Image src={img.image_url} alt={img.filename} fill />
					</div>
					<p>
						{img.filename} -{" "}
						<span className="italic font-semibold">
							score: {img.score}
						</span>
					</p>
				</div>
			))}
		</div>
	);
};

export default ListImage;
