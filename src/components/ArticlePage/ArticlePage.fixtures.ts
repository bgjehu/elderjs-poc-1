import { Image } from '../../type/image';

interface Category {
  name: string;
  slug: string;
}

interface ArticlePage {
  category: Category;
  publishDateLabel: string;
  description?: string;
  content: string;
  title: string;
  headingLevel: string;
  image?: Image;
  theme: string;
}

const description = `- Inside Rx has helped patients save $400 million since it launched in May of 2017

- Expanded list of discounted drugs includes therapies for ED, diabetes, allergies, birth control, digestive health and treatments for the symptoms of menopause and morning sickness`;

const content = `**FRANKLIN LAKES, N.J.**

Driving lower drug prices and making prescription medications more accessible is a priority for healthcare providers, patients and payers alike. For consumers with high deductibles or who pay out-of-pocket for their medications, the [Inside Rx® card](https://insiderx.com/card), a free prescription savings card that can be downloaded when purchasing drugs at participating pharmacies, has been offering more affordable access to brand-name and generic medications since 2017.

"Inside Rx is continually growing and expanding our partnerships with pharmaceutical manufacturers to deliver on our commitment to offer more affordable access to people struggling to pay for brand, as well as generic, medications they need," said Leslie Achter, President of Inside Rx. "Since the launch of the card in May of 2017, we've helped patients save $400 million when purchasing their prescription medications. We invite anyone struggling to afford their medication or wanting to save money on their prescriptions to go to InsideRx.com."

The savings program recently expanded its list of featured discounted medications to more than 150 brand-name prescription drugs. Discounts on these medications, along with thousands of other brands and generics, could provide more affordable access to therapies for more consumers. The medications offered in connection with the prescription savings card average 80 percent off retail on generics and 40 percent off on featured brand-name drugs*.

Some of the newly added discounts relate to therapies for erectile disfunction (ED), diabetes, various types of allergies, birth control, digestive health, and treatments for the symptoms of menopause and morning sickness. A comprehensive list of all brand medications offered through Inside Rx can be found at InsideRx.com/Featured-Medications.

To benefit from the Inside Rx discounts, eligible users simply need to download the free discount card from InsideRx.com or via GoodRx.com/brand and present it at one of the 40,000 participating pharmacies. The Inside Rx card can be used at national chains such as CVS, the Kroger Family of Pharmacies, Walgreens and Walmart. There is no membership fee or other costs to download or use the card which could save patients hundreds or even thousands of dollars a year.

*Average savings per prescription for over 50% of users of Inside Rx card are based on cash price versus Inside Rx price for featured brand or generic medications, as indicated.

---

**About Inside Rx**

Headquartered in Franklin Lakes, New Jersey, Inside Rx provides affordable access to prescription medication for the uninsured and those navigating the changing healthcare landscape.`;

export const props: ArticlePage = {
  category: {
    name: 'Company News',
    slug: 'company-news',
  },
  title: 'Inside Rx Savings Card Offers Lower Cost Access to More Prescription Medications',
  publishDateLabel: '10/30/2019',
  description,
  content,
  headingLevel: 'h1',
  theme: 'light_pink',
  image: {
    url: 'https://ik.imagekit.io/insiderx/INRX_GenericBlog_356x180Pets_gUTQBFY7J.svg',
    alt: 'Article image',
  },
};
