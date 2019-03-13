/*import { Category } from '../../api/category/category.model'
import { dbSetup } from '../setup.env'

beforeAll(async () => {
    await dbSetup.open()
})

afterEach(async () => {
    await dbSetup.drop()
})

afterAll(async () => {
    await dbSetup.close()
})

it('adds 1 + 2 to equal 3', async () => {
    jest.setTimeout(30000)
    const test = new Category({ name: 'd', description: 'description' })
    await test.save()
    console.log(await Category.find({}))
    expect(1 + 2).toBe(3)
})

it('adds 1 + 2 to equal 3', async () => {
    jest.setTimeout(30000)
    const test = new Category({ name: 'c', description: 'description' })
    await test.save()
    console.log(await Category.find({}))
    expect(1 + 2).toBe(3)
})
*/
