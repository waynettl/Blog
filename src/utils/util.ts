import dayjs from "dayjs"

/**
 * @description 获取两个数之间的随机整数（包含最大值和最小值）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number}
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * @description 计算间隔时间
 * @param {dayjs.ConfigType} date 日期
 * @return {string} 间隔时间结果
 */
export function calculateAge(date: dayjs.ConfigType): string {
  const duration = dayjs.duration(dayjs().diff(date, "day"), "days")

  const years = duration.years()
  const months = duration.months()
  const remainingDays = duration.days()

  if (years === 0 && months === 0) return `${remainingDays}天`
  if (years === 0) return `${months}月${remainingDays}天`
  if (months === 0) return `${years}岁${remainingDays}天`

  return `${years}岁${months}月${remainingDays}天`
}
