﻿using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using WijayanthaHardware.Common;
using WijayanthaHardware.Models;
using System;

namespace WijayanthaHardware.Services
{
    public class DashBoardService : RepositoryBase
    {
        public async Task<List<PaintViewModel>> GetDashBoardChartDataAsync()
        {
            try
            {
                var paintViewModel = new List<PaintViewModel>();
                using (var context = CreateContext())
                {
                    var uiniqueProductIds = await context.PaintMaster.Where(w => w.Status == (int)RecordStatusEnum.Active).Select(s => s.PaintCategoryId).Distinct().ToListAsync();

                    foreach (var distinctid in uiniqueProductIds)
                    {
                        var result = await context.PaintSubCategory.Include(i => i.PaintCategory).Where(w => w.PaintCategoryId == distinctid && w.Status == (int)RecordStatusEnum.Active).ToListAsync();
                        var vm = new PaintViewModel
                        {
                            CategoryName = result.FirstOrDefault().PaintCategory.Value,
                            AvailableQuantity = result.Count()
                        };
                        paintViewModel.Add(vm);
                    }
                }
                return paintViewModel;
            }
            catch (Exception ex)
            {
                var aa = ex.StackTrace;
                return new List<PaintViewModel>();
            }

        }


        //public async Task<List<PowerToolsViewModel>> GetDashBoardChartDataAsync()
        //{
        //    try
        //    {
        //        var paintViewModel = new List<PowerToolsViewModel>();
        //        using (var context = CreateContext())
        //        {
        //            var uiniqueProductIds = await context.PowerToolMaster.Where(w => w.Status == (int)RecordStatusEnum.Active).Select(s => s.PowerToolCategoryId).Distinct().ToListAsync();

        //            foreach (var distinctid in uiniqueProductIds)
        //            {
        //                var result = await context.PowerToolSubCatogery.Include(i => i.PowerToolCategory).Where(w => w.PowerToolCategoryId == distinctid && w.Status == (int)RecordStatusEnum.Active).ToListAsync();
        //                var vm = new PaintViewModel
        //                {
        //                    CategoryName = result.FirstOrDefault().PowerToolCategoryId.Value,
        //                    AvailableQuantity = result.Count()
        //                };
        //                PowerToolsViewModel.Add(vm);
        //            }
        //        }
        //        return PowerToolsViewModel;
        //    }
        //    catch (Exception ex)
        //    {
        //        var aa = ex.StackTrace;
        //        return new List<PowerToolsViewModel>();
        //    }

        }
    }
