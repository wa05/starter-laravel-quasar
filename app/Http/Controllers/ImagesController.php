<?php

namespace App\Http\Controllers;

use App\Models\Image as ImageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Log;
use Intervention\Image\Facades\Image;
use DB;
use function foo\func;

class ImagesController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    protected $image_types = [
//        'thumbnail' => [
//            'width' => null,
//            'height' => 400
//        ],
//        'detail_page' => [
//            'width' => null,
//            'height' => 400
//        ],
        'product' => [
            'width' => 1800,
            'height' => null
        ],
    ];

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $kind = $request->kind;
//            $product_id = $request->product_id;

//            $product = Product::with('images')->where('id', $product_id)->first();

            if ($request->hasFile('image')) {
                $image = $request['image'];
                $img_file = Input::file('image');
                $time = time();
                $filename = "{$time}-{$img_file->getFilename()}.{$img_file->clientExtension()}";
                $user_id = 1;

                foreach ($this->image_types as $key => $img_type) {
                    $directory = public_path("images/tratamientos");
                    if (!\File::isDirectory($directory)) {
                        \File::makeDirectory($directory, 0777, true, true);
                    }

                    $location = public_path("/images/tratamientos/" . $filename);

                    $result = Image::make($image)
//                        ->resize($img_type['width'], $img_type['height'], function ($constraint) {
//                            $constraint->aspectRatio();
//                        })
                        ->save($location, 100);
                }

                $new_img = new ImageModel();
                $new_img->name = $filename;
                $new_img->treatment_id = isset($request->service_id) && $request->service_id !== 'null' ? $request->service_id : null;
                $new_img->subtreatment_id = isset($request->subtreatment_id) && $request->subtreatment_id !== 'null' ? $request->subtreatment_id : null;
                $new_img->user_id = 1;
                $new_img->kind = $kind;
                $new_img->save();
            }

        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }

        $service_id = $request->service_id;
        if ($service_id === 'null') {
            $service_id = null;
        }

        $subtreatment_id = $request->subtreatment_id;
        if ($subtreatment_id === 'null') {
            $subtreatment_id = null;
        }
        $saved_images = $this->savedImages($service_id, $subtreatment_id, $kind);

        return response()->json([
            'msg' => 'Imagen guardada exitosamente',
            'images' => $saved_images
        ]);
        return $this->successResponse();
    }

    protected function savedImages($treatment_id = null, $subtreatment_id = null, $kind = null)
    {
        $saved_images = DB::table('images')
            ->when(!isset($treatment_id) && !isset($subtreatment_id), function($q) use ($treatment_id) {
                $q->where('treatment_id', null)
                    ->where('subtreatment_id', null);
            })
            ->when(isset($treatment_id), function ($q) use ($treatment_id) {
                $q->where('treatment_id', $treatment_id);
            })
            ->when(isset($subtreatment_id), function ($q) use ($subtreatment_id) {
                $q->where('subtreatment_id', $subtreatment_id);
            })
            ->when(isset($kind) && !in_array($kind,['after','before']), function ($q) use ($kind) {
                $q->whereKind($kind);
            })
            ->when(isset($kind) && in_array($kind,['after','before']), function ($q) use ($kind) {
                $q->whereIn('kind',['after','before']);
            })
            ->get();

        return $saved_images;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function deleteImage(Request $request)
    {
        try {
            $image = ImageModel::where('id', $request->image_id)->first();
            $image->delete();

            $saved_images = $this->savedImages(
                $request->service_id ?? null, $request->subtreatment_id ?? null);
            return response()->json([
                'error' => false,
                'msg' => 'Imagen eliminada correctamente',
                'images' => $saved_images
            ]);


        } catch (\Exception $e) {
            Log::info($e->getMessage());
        }
        return response()->json([
            'error' => true,
            'msg' => 'Error eliminando imagen',
            'images' => []
        ]);
    }

    public function resetImages(Request $request)
    {
        try {
            Log::info('Starting delete ...');
            DB::beginTransaction();

            $images = ImageModel::where([
                ['user_id', 1],
                ['service_id', null],
                ['kind', 'create_service']
            ])->get();

            foreach ($images as $image) {
                $image->delete();
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::info($e->getMessage());
            return $this->errorResponse($e->getMessage(), $e);
        }

        return $this->successResponse('OK');

    }
}
