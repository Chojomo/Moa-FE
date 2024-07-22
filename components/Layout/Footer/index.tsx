import { Icon } from '@/components/Icon'

export default function Footer() {
  return (
    <footer className="absolute bottom-[0px] left-[0px] w-[100%] flex px-[30px] py-[10px] justify-center">
      <div className="flex-1">
        <div className="flex items-center gap-[10px]">
          <Icon
            name="Logo"
            width={35}
            height={35}
            className="mb-[10px]"
            skeletonClassName="rounded"
          />
          <p className="text-[18px] text-heading-text font-bold">Moa</p>
        </div>
        <p className="text-[12px] text-body-text text-start">
          Copyright © Moa All Rights Reserved.
        </p>
      </div>
      <div className="flex-center gap-[20px]">
        <Icon
          name="Notion"
          width={22}
          height={23}
          className="mb-[10px]"
          skeletonClassName="rounded"
        />
        <Icon
          name="Github"
          width={23}
          height={23}
          className="mb-[10px]"
          skeletonClassName="rounded"
        />
      </div>
    </footer>
  )
}
