import labelService from '../service/label.service'

import type { Next } from 'koa'
import type { RouterContext } from '../types/base.type'
import type { IAddLabelBody, ILabels, LabelType } from '../types/moment.type'
import type { ITokenContext } from '../types/auth.type'

export async function checkLabelName(ctx: RouterContext<ITokenContext & ILabels>, next: Next) {
  const { labels } = <IAddLabelBody>ctx.request.body
  const labelList: LabelType[] = []

  for (const label of labels) {
    const [rows] = await labelService.findName(label.toString())
    const res = rows[0]
    if (!res) {
      const [rows] = await labelService.create(label.toString())
      labelList.push({ id: rows.insertId, name: label.toString() })
    } else {
      labelList.push({ id: res.id, name: res.name })
    }
  }

  ctx.labels = labelList

  await next()
}
