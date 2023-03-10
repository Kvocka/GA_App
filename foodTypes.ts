export interface paths {
    "/api/v2/product/{barcode}": {
      /**
       * A product can be fetched via its unique barcode.
       * It returns all the details of that product response.
       */
      get: operations["get-product-by-barcode"];
    };
    "/api/v2/product/{barcode}?fields=knowledge_panels": {
      /**
       * Knowledge panels gives high leve informations about a product,
       * ready to display.
       * This is used by open food facts website,
       * and by the official mobile application
       */
      get: operations["get-product-by-barcode-knowledge-panels"];
    };
    "/cgi/product_image_upload.pl": {
      /**
       * Photos are source and proof of data.
       * The first photo uploaded for a product is
       * auto-selected as the product’s “front” photo.'
       */
      post: operations["get-cgi-product_image_upload.pl"];
    };
    "/cgi/ingredients.pl": {
      /** Open Food Facts uses optical character recognition (OCR) to retrieve nutritional data and other information from the product labels. */
      get: operations["get-cgi-ingredients.pl"];
      parameters: {};
    };
    "/cgi/product_image_crop.pl": {
      /**
       * Although we recommend rotating photos manually and uploading a new version of the image,
       * the OFF API allows you to make api calls to automate this process.
       * You can rotate existing photos by setting the angle to 90º, 180º, or 270º clockwise.
       */
      get: operations["get-cgi-product_image_crop.pl"];
      /**
       * Cropping is only relevant for editing existing products.
       * You cannot crop an image the first time you upload it to the system.
       */
      post: operations["post-cgi-product_image_crop.pl"];
    };
    "/cgi/product_jqm2.pl": {
      /**
       * If the barcode exists then you will be editing the existing product,
       * However if it doesn''t you will be creating a new product with that unique barcode,
       * and adding properties to the product.
       */
      post: operations["post-cgi-product_jqm2.pl"];
    };
    "/api/v2/search": {
      /**
       * Search request allows you to get the nutritional data of products that match your search criteria.
       * It allows you create many custom APIs for your use case.
       * If the search query parameter has 2 possible values, they are seperated by a comma(,).
       * When filtering via a parameter that has different language codes like `fr`, `de` or `en`, specify the language code in the parameter name e.g `categories_tags_en`
       */
      get: operations["get-search"];
      parameters: {};
    };
    "/cgi/suggest.pl": {
      /**
       * For example , Dave is looking for packaging_shapes that contain the term "fe",
       * all packaging_shapes containing "fe" will be returned.
       * This is useful if you have a search in your application,
       * for a specific product field.
       */
      get: operations["get-cgi-suggest.pl"];
    };
    "/api/v2/product/{barcode}?fields=images": {
      /** Images ensure the reliability of Open Food Facts data. It provides a primary source and proof of all the structured data. You may therefore want to display it along the structured information. */
      get: operations["get-api-v2-product-barcode-?fields=images"];
      parameters: {
        path: {
          barcode: string;
        };
      };
    };
  }
  
  export interface components {
    schemas: {
      Product: components["schemas"]["product"];
      get_product_by_barcode_base: {
        /**
         * Barcode of the product
         * (can be EAN-13 or internal codes for some food stores).
         * For products without a barcode, Open Food Facts assigns a
         * number starting with the 200 reserved prefix.
         */
        code?: string;
        status?: number;
        status_verbose?: string;
      };
      image: {
        sizes?: {
          "100"?: {
            h?: number;
            w?: number;
          };
          "400"?: {
            h?: number;
            w?: number;
          };
          full?: {
            h?: number;
            w?: number;
          };
        };
        uploaded_t?: string;
        uploader?: string;
      };
      ingredient: {
        id?: string;
        ingredients?: components["schemas"]["ingredient"];
        percent?: number;
        percent_estimate?: unknown;
        percent_max?: unknown;
        percent_min?: number;
        text?: string;
        vegan?: string;
        vegetarian?: string;
      }[];
      /** The title of a panel. */
      title_element: {
        title?: string;
        /** Indicates that the panel corresponds to a A to E grade such as the Nutri-Score of the Eco-Score. */
        grade?: "a" | "b" | "c" | "d" | "e" | "unknown";
        icon_url?: string;
        icon_color_from_evaluation?: string;
        /** If set to "small", the icon should be displayed at a small size. */
        icon_size?: string;
        /** Used to indicate a special type for the title, such as "grade" for Nutri-Score and Eco-Score. */
        type?: string;
      };
      /**
       * A text in simple HTML format to display.
       *
       * For some specific texts that correspond to a product field (e.g. a product name, the ingredients list of a product),the edit_field_* fields are used to indicate how to edit the field value.
       */
      text_element: {
        /** the type of text, might influence the way you display it. */
        type?: "summary" | "warning" | "notes";
        /** Text to display in HTML format. */
        html?: string;
        /** Language of the text. The name of the language is returned in the language requested when making the API call. e.g. if the text is in Polish, and the requested language is French, the language field will contain "Polonais" (French for "Polish"). Only set for specific fields such as the list of ingredients of a product. */
        language?: string;
        /** 2 letter language code for the text. Only set for specific fields such as the list of ingredients of a product. */
        lc?: string;
        /** id of the field used to edit this text in the product edit API. */
        edit_field_id?: string;
        /** Type of the product field. */
        edit_field_type?: string;
        /** Current value of the product field. This may differ from the html field which can contain extra formating. */
        edit_field_value?: string;
        /** Link to the source */
        source_url?: string;
        /** name of the source */
        source_text?: string;
        /** Source locale name */
        source_lc?: string;
        /** Human readable source locale name */
        source_language?: string;
      };
      image_element: {
        /** full URL of the image */
        url?: string;
        /**
         * Width of the image.
         *
         * This is just a suggestion coming from the server,
         * the client may choose to use its own dimensions for the image.
         */
        width?: number;
        /**
         * Height of the image.
         *
         * This is just a suggestion coming from the server,
         * the client may choose to use its own dimensions for the image.
         */
        height?: number;
        /** Alt Text of the image. */
        alt_text?: string;
      };
      /** Panels can include other panels as sub-panels using the panel_element. */
      panel_element: {
        /** The id of the panel to include. The id is the key of the panel in the panels object returned in the knowledge_panels field. */
        panel_id?: string;
      };
      /** The panel group element is used to display an optional title followed by a number of sub-panels. */
      panel_group_element: {
        title?: string;
        /** The ids of the panels to include. The ids are the keys of the panels in the panels object returned in the knowledge_panels field. */
        panel_ids?: string[];
      };
      /** Element to display a table. */
      table_element: {
        /** An id for the table. */
        id?: string;
        /** Title of the column. */
        title?: string;
        rows?: string;
        columns?: {
          type?: string;
          text?: string;
          text_for_small_screens?: string;
          style?: string;
          column_group_id?: string;
          shown_by_default?: boolean;
        }[];
      };
      /** Each element object contains one specific element object such as a text element or an image element. */
      element: {
        /**
         * The type of the included element object.
         * The type also indicates which field contains the included element object.
         * e.g. if the type is "text", the included element object will be in the "text_element" field.
         *
         * Note that in the future, new type of element may be added,
         * so your code should ignore unrecognized types, and unknown properties.
         *
         * TODO: add Map type
         */
        type: "text" | "image" | "action" | "panel" | "panel_group" | "table";
        text_element?: components["schemas"]["text_element"];
        image_element?: components["schemas"]["image_element"];
        action_element?: string;
        panel_element?: components["schemas"]["panel_element"];
        panel_group_element?: components["schemas"]["panel_group_element"];
        table_element?: components["schemas"]["table_element"];
      };
      /** Each panel contains an optional title and an optional array of elements. */
      panel: {
        /** Type of the panel. If set to "card", the panel and its sub-panels should be displayed in a card. If set to "inline", the panel should have its content always displayed. */
        type?: string;
        /** If true, the panel is to be displayed already expanded. If false, only the title should be displayed, and the user should be able to click or tap it to open the panel and display the elements. */
        expanded?: boolean;
        /** If set to "large", the content of the panel should be expanded on large screens, but it should still be possible to unexpand it. */
        expand_for?: string;
        title_element?: components["schemas"]["title_element"];
        /** An ordered list of elements to display in the content of the panel. */
        elements?: components["schemas"]["element"][];
        /**
         * a message level, as levels we use in log.
         * It might help theming the panel visualy
         */
        level?: string;
        /**
         * size is either empty (normal display)
         * or small to indicate a panel that should have a smaller font size
         */
        size?: "small";
        topics?: string[];
      };
      /**
       * The panels object is a dictionary of individual panel objects.
       * Each key of the dictionary is the id of the panel, and the value is the panel object.
       *
       * Apps typically display a number of root panels with known panel ids (e.g. health_card and environment_card). Panels can reference other panels and display them as sub-panels.
       */
      panels: {
        additionalProperties?: components["schemas"]["panel"];
      };
      /** The shape property is canonicalized using the packaging_shapes taxonomy. */
      shape: {
        /** Canonical id of the entry in the taxonomy. If the value cannot be mapped to a taxonomy entry, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        id?: string;
        /** Name of the entry in the language requested in the tags_lc field of the request. This field is returned only of tags_lc is specified. If the translation is not available, or if the entry does not exist in the taxonomy, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        lc_name?: string;
      };
      /** The material property is canonicalized using the packaging_materials taxonomy. */
      material: {
        /** Canonical id of the entry in the taxonomy. If the value cannot be mapped to a taxonomy entry, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        id?: string;
        /** Name of the entry in the language requested in the tags_lc field of the request. This field is returned only of tags_lc is specified. If the translation is not available, or if the entry does not exist in the taxonomy, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        lc_name?: string;
      };
      /** The recycling property is canonicalized using the packaging_recycling taxonomy. */
      recycling: {
        /** Canonical id of the entry in the taxonomy. If the value cannot be mapped to a taxonomy entry, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        id?: string;
        /** Name of the entry in the language requested in the tags_lc field of the request. This field is returned only of tags_lc is specified. If the translation is not available, or if the entry does not exist in the taxonomy, the value will be the name of the entry in its original language prefixed by the language 2 letter code and a colon. */
        lc_name?: string;
      };
      /**
       * Each packaging component has different properties to specify how many there are, its shape, material etc.
       *
       * The shape, material and recycling properties are mapped to one entry in the packaging_shapes, packaging_materials and packaging_recycling taxonomies, and the value of the property is the canonical name of the taxonomy entry (e.g. en:bottle).
       *
       * They may contain values that could not yet get matched to their respective taxonomy, in which case they will contain a free text value prefixed with the language code of this text value (e.g. "fr:Bouteille sphérique" might have been entered by a French user to indicate it is a spherical bottle).
       */
      packaging_component: {
        /** umber of units of this packaging component contained in the product (e.g. 6 for a pack of 6 bottles) */
        number_of_units?: number;
        shape?: components["schemas"]["shape"];
        material?: components["schemas"]["material"];
        recycling?: components["schemas"]["recycling"];
        /** Quantity (weight or volume) of food product contained in the packaging component. (e.g. 75cl for a wine bottle) */
        quantity_per_unit?: string;
        /** Value parsed from the quantity field. */
        quantity_per_unit_value?: number;
        /** Unit parsed and normalized from the quantity field. */
        quantity_per_unit_unit?: string;
        /** Weight (as specified by the manufacturer) of one unit of the empty packaging component (in grams). (e.g. for a 6 pack of 1.5l water bottles, it might be 30, the weight in grams of 1 empty water bottle without its cap which is a different packaging component). */
        weight_specified?: number;
        /** Weight (as measured by one or more users) of one unit of the empty packaging component (in grams). (e.g. for a 6 pack of 1.5l water bottles, it might be 30, the weight in grams of 1 empty water bottle without its cap which is a different packaging component). */
        weight_measured?: number;
        /** Weight (as estimated from similar products) of one unit of the empty packaging component (in grams). (e.g. for a 6 pack of 1.5l water bottles, it might be 30, the weight in grams of 1 empty water bottle without its cap which is a different packaging component). */
        weight_estimated?: number;
        /** Weight of one unit of the empty packaging component. */
        weight?: number;
        /** Indicates which field was used to populate the "weight" field. Either "specified", "measured", or "estimated" */
        weight_source_id?: string;
      };
      /**
       * The packagings object is an array of individual packaging component objects.
       *
       * The Packaging data document explains how packaging data is structured in Open Food Facts: https://github.com/openfoodfacts/openfoodfacts-server/blob/main/docs/explanations/packaging-data.md
       *
       * The shape, material and recycling properties of each packaging component are linked to entries in the packaging_shapes, packaging_materials and packaging_recycling taxonomies:
       *
       * https://world.openfoodfacts.org/data/taxonomies/packaging_shapes.json
       * https://world.openfoodfacts.org/data/taxonomies/packaging_materials.json
       * https://world.openfoodfacts.org/data/taxonomies/packaging_recycling.json
       *
       * If the tags_lc field is set, the properties will include a lc_name field with the translation in the requested language.
       */
      packagings: components["schemas"]["packaging_component"][];
      /** Indicate if the packagings array contains all the packaging parts of the product. This field can be set by users when they enter or verify packaging data. Possible values are 0 or 1. */
      packagings_complete: number;
      product: {
        _id?: string;
        _keywords?: string[];
        abbreviated_product_name?: string;
        abbreviated_product_name_fr?: string;
        abbreviated_product_name_fr_imported?: string;
        added_countries_tags?: { [key: string]: unknown }[];
        /** Number of food additives. */
        additives_n?: number;
        additives_original_tags?: string[];
        additives_prev_original_tags?: string[];
        additives_tags?: string[];
        allergens?: string;
        allergens_from_ingredients?: string;
        allergens_from_user?: string;
        allergens_hierarchy?: string[];
        allergens_imported?: string;
        allergens_lc?: string;
        allergens_tags?: string[];
        amino_acids_prev_tags?: { [key: string]: unknown }[];
        amino_acids_tags?: { [key: string]: unknown }[];
        brands?: string;
        brands_imported?: string;
        brands_tags?: string[];
        carbon_footprint_percent_of_known_ingredients?: number;
        categories?: string;
        categories_hierarchy?: string[];
        categories_lc?: string;
        categories_properties?: {
          "agribalyse_food_code:en"?: string;
          "agribalyse_proxy_food_code:en"?: string;
          "ciqual_food_code:en"?: string;
        };
        categories_properties_tags?: string[];
        categories_tags?: string[];
        category_properties?: {
          "ciqual_food_name:en"?: string;
        };
        checked?: string;
        checkers_tags?: string[];
        ciqual_food_name_tags?: string[];
        cities_tags?: { [key: string]: unknown }[];
        code?: string;
        codes_tags?: string[];
        compared_to_category?: string;
        complete?: number;
        completeness?: number;
        conservation_conditions?: string;
        conservation_conditions_fr?: string;
        conservation_conditions_fr_imported?: string;
        correctors_tags?: string[];
        /** List of countries where the product is sold. */
        countries?: string;
        countries_beforescanbot?: string;
        countries_hierarchy?: string[];
        countries_imported?: string;
        countries_lc?: string;
        countries_tags?: string[];
        /** Date when the product was added (UNIX timestamp format). */
        created_t?: number;
        /** The contributor who added the product first. */
        creator?: string;
        /** Contact info of customer service. */
        customer_service?: string;
        customer_service_fr?: string;
        customer_service_fr_imported?: string;
        data_quality_bugs_tags?: { [key: string]: unknown }[];
        data_quality_errors_tags?: { [key: string]: unknown }[];
        data_quality_info_tags?: string[];
        data_quality_tags?: string[];
        data_quality_warnings_tags?: string[];
        /** Source of data imported from producers. */
        data_sources?: string;
        data_sources_imported?: string;
        data_sources_tags?: string[];
        ecoscore_data?: {
          adjustments?: {
            origins_of_ingredients?: {
              aggregated_origins?: {
                origin?: string;
                percent?: number;
              }[];
              epi_score?: number;
              epi_value?: number;
              origins_from_origins_field?: string[];
              transportation_scores?: {
                ad?: number;
                al?: number;
                at?: number;
                ax?: number;
                ba?: number;
                be?: number;
                bg?: number;
                ch?: number;
                cy?: number;
                cz?: number;
                de?: number;
                dk?: number;
                dz?: number;
                ee?: number;
                eg?: number;
                es?: number;
                fi?: number;
                fo?: number;
                fr?: number;
                gg?: number;
                gi?: number;
                gr?: number;
                hr?: number;
                hu?: number;
                ie?: number;
                il?: number;
                im?: number;
                is?: number;
                it?: number;
                je?: number;
                lb?: number;
                li?: number;
                lt?: number;
                lu?: number;
                lv?: number;
                ly?: number;
                ma?: number;
                mc?: number;
                md?: number;
                me?: number;
                mk?: number;
                mt?: number;
                nl?: number;
                no?: number;
                pl?: number;
                ps?: number;
                pt?: number;
                ro?: number;
                rs?: number;
                se?: number;
                si?: number;
                sj?: number;
                sk?: number;
                sm?: number;
                sy?: number;
                tn?: number;
                tr?: number;
                ua?: number;
                uk?: number;
                us?: number;
                va?: number;
                world?: number;
                xk?: number;
              };
              transportation_values?: {
                ad?: number;
                al?: number;
                at?: number;
                ax?: number;
                ba?: number;
                be?: number;
                bg?: number;
                ch?: number;
                cy?: number;
                cz?: number;
                de?: number;
                dk?: number;
                dz?: number;
                ee?: number;
                eg?: number;
                es?: number;
                fi?: number;
                fo?: number;
                fr?: number;
                gg?: number;
                gi?: number;
                gr?: number;
                hr?: number;
                hu?: number;
                ie?: number;
                il?: number;
                im?: number;
                is?: number;
                it?: number;
                je?: number;
                lb?: number;
                li?: number;
                lt?: number;
                lu?: number;
                lv?: number;
                ly?: number;
                ma?: number;
                mc?: number;
                md?: number;
                me?: number;
                mk?: number;
                mt?: number;
                nl?: number;
                no?: number;
                pl?: number;
                ps?: number;
                pt?: number;
                ro?: number;
                rs?: number;
                se?: number;
                si?: number;
                sj?: number;
                sk?: number;
                sm?: number;
                sy?: number;
                tn?: number;
                tr?: number;
                ua?: number;
                uk?: number;
                us?: number;
                va?: number;
                world?: number;
                xk?: number;
              };
              values?: {
                ad?: number;
                al?: number;
                at?: number;
                ax?: number;
                ba?: number;
                be?: number;
                bg?: number;
                ch?: number;
                cy?: number;
                cz?: number;
                de?: number;
                dk?: number;
                dz?: number;
                ee?: number;
                eg?: number;
                es?: number;
                fi?: number;
                fo?: number;
                fr?: number;
                gg?: number;
                gi?: number;
                gr?: number;
                hr?: number;
                hu?: number;
                ie?: number;
                il?: number;
                im?: number;
                is?: number;
                it?: number;
                je?: number;
                lb?: number;
                li?: number;
                lt?: number;
                lu?: number;
                lv?: number;
                ly?: number;
                ma?: number;
                mc?: number;
                md?: number;
                me?: number;
                mk?: number;
                mt?: number;
                nl?: number;
                no?: number;
                pl?: number;
                ps?: number;
                pt?: number;
                ro?: number;
                rs?: number;
                se?: number;
                si?: number;
                sj?: number;
                sk?: number;
                sm?: number;
                sy?: number;
                tn?: number;
                tr?: number;
                ua?: number;
                uk?: number;
                us?: number;
                va?: number;
                world?: number;
                xk?: number;
              };
              warning?: string;
            };
            packaging?: {
              non_recyclable_and_non_biodegradable_materials?: number;
              packagings?: {
                ecoscore_material_score?: number;
                ecoscore_shape_ratio?: number;
                material?: string;
                shape?: string;
              }[];
              score?: number;
              value?: number;
              warning?: string;
            };
            production_system?: {
              labels?: string[];
              value?: number;
              warning?: string;
            };
            threatened_species?: {
              ingredient?: string;
              value?: number;
            };
          };
          agribalyse?: {
            agribalyse_food_code?: string;
            co2_agriculture?: number;
            co2_consumption?: number;
            co2_distribution?: number;
            co2_packaging?: number;
            co2_processing?: number;
            co2_total?: number;
            co2_transportation?: number;
            code?: string;
            dqr?: string;
            ef_agriculture?: number;
            ef_consumption?: number;
            ef_distribution?: number;
            ef_packaging?: number;
            ef_processing?: number;
            ef_total?: number;
            ef_transportation?: number;
            is_beverage?: number;
            /**
             * This can be returned in many other languages
             * like name_fr (for french).
             */
            name_en?: string;
            score?: number;
            version?: string;
          };
          grade?: string;
          grades?: {
            ad?: string;
            al?: string;
            at?: string;
            ax?: string;
            ba?: string;
            be?: string;
            bg?: string;
            ch?: string;
            cy?: string;
            cz?: string;
            de?: string;
            dk?: string;
            dz?: string;
            ee?: string;
            eg?: string;
            es?: string;
            fi?: string;
            fo?: string;
            fr?: string;
            gg?: string;
            gi?: string;
            gr?: string;
            hr?: string;
            hu?: string;
            ie?: string;
            il?: string;
            im?: string;
            is?: string;
            it?: string;
            je?: string;
            lb?: string;
            li?: string;
            lt?: string;
            lu?: string;
            lv?: string;
            ly?: string;
            ma?: string;
            mc?: string;
            md?: string;
            me?: string;
            mk?: string;
            mt?: string;
            nl?: string;
            no?: string;
            pl?: string;
            ps?: string;
            pt?: string;
            ro?: string;
            rs?: string;
            se?: string;
            si?: string;
            sj?: string;
            sk?: string;
            sm?: string;
            sy?: string;
            tn?: string;
            tr?: string;
            ua?: string;
            uk?: string;
            us?: string;
            va?: string;
            world?: string;
            xk?: string;
          };
          missing?: {
            labels?: number;
            origins?: number;
            packagings?: number;
          };
          missing_data_warning?: number;
          previous_data?: {
            grade?: unknown;
            score?: unknown;
            agribalyse?: unknown;
          };
          score?: number;
          scores?: {
            ad?: number;
            al?: number;
            at?: number;
            ax?: number;
            ba?: number;
            be?: number;
            bg?: number;
            ch?: number;
            cy?: number;
            cz?: number;
            de?: number;
            dk?: number;
            dz?: number;
            ee?: number;
            eg?: number;
            es?: number;
            fi?: number;
            fo?: number;
            fr?: number;
            gg?: number;
            gi?: number;
            gr?: number;
            hr?: number;
            hu?: number;
            ie?: number;
            il?: number;
            im?: number;
            is?: number;
            it?: number;
            je?: number;
            lb?: number;
            li?: number;
            lt?: number;
            lu?: number;
            lv?: number;
            ly?: number;
            ma?: number;
            mc?: number;
            md?: number;
            me?: number;
            mk?: number;
            mt?: number;
            nl?: number;
            no?: number;
            pl?: number;
            ps?: number;
            pt?: number;
            ro?: number;
            rs?: number;
            se?: number;
            si?: number;
            sj?: number;
            sk?: number;
            sm?: number;
            sy?: number;
            tn?: number;
            tr?: number;
            ua?: number;
            uk?: number;
            us?: number;
            va?: number;
            world?: number;
            xk?: number;
          };
          status?: string;
        };
        ecoscore_extended_data_version?: string;
        ecoscore_grade?: string;
        ecoscore_score?: number;
        ecoscore_tags?: string[];
        editors_tags?: string[];
        /** Packager code. */
        emb_codes?: string;
        emb_codes_orig?: string;
        emb_codes_tags?: { [key: string]: unknown }[];
        entry_dates_tags?: string[];
        environment_impact_level?: string;
        environment_impact_level_tags?: { [key: string]: unknown }[];
        expiration_date?: string;
        food_groups?: string;
        food_groups_tags?: string[];
        "fruits-vegetables-nuts_100g_estimate"?: number;
        /**
         * Legal name of the product as regulated
         * by the European authorities.
         */
        generic_name?: string;
        /**
         * This can be returned in many other languages
         * like generic_name_fr (for french).
         */
        generic_name_en?: string;
        grades?: { [key: string]: unknown };
        id?: string;
        image_front_small_url?: string;
        image_front_thumb_url?: string;
        image_front_url?: string;
        image_nutrition_small_url?: string;
        image_nutrition_thumb_url?: string;
        image_nutrition_url?: string;
        image_small_url?: string;
        image_thumb_url?: string;
        image_url?: string;
        images?: {
          "1"?: components["schemas"]["image"];
        };
        informers_tags?: string[];
        ingredients?: components["schemas"]["ingredient"];
        ingredients_analysis?: {
          "en:palm-oil"?: string[];
          "en:vegan-status-unknown"?: string[];
          "en:vegetarian-status-unknown"?: string[];
        };
        ingredients_analysis_tags?: string[];
        ingredients_from_or_that_may_be_from_palm_oil_n?: number;
        ingredients_from_palm_oil_n?: number;
        ingredients_from_palm_oil_tags?: { [key: string]: unknown }[];
        ingredients_hierarchy?: string[];
        ingredients_n?: number;
        ingredients_n_tags?: string[];
        ingredients_original_tags?: string[];
        ingredients_percent_analysis?: number;
        ingredients_tags?: string[];
        /**
         * Raw list of ingredients. This will get automatically
         * parsed and get used to compute the Eco-Score. You can
         * either request it (if it exists) or send it in a specific language.
         */
        ingredients_text?: string;
        ingredients_text_ar?: string;
        ingredients_text_de?: string;
        ingredients_text_en?: string;
        ingredients_text_en_ocr_1642445989?: string;
        ingredients_text_en_ocr_1642445989_result?: string;
        ingredients_text_en_ocr_1643128902?: string;
        ingredients_text_en_ocr_1643128902_result?: string;
        ingredients_text_es?: string;
        ingredients_text_fr?: string;
        ingredients_text_fr_imported?: string;
        ingredients_text_fr_ocr_1642445989?: string;
        ingredients_text_fr_ocr_1642445989_result?: string;
        ingredients_text_fr_ocr_1643128902?: string;
        ingredients_text_fr_ocr_1643128902_result?: string;
        ingredients_text_id?: string;
        ingredients_text_it?: string;
        ingredients_text_nl?: string;
        ingredients_text_with_allergens?: string;
        ingredients_text_with_allergens_ar?: string;
        ingredients_text_with_allergens_de?: string;
        ingredients_text_with_allergens_en?: string;
        ingredients_text_with_allergens_es?: string;
        ingredients_text_with_allergens_fr?: string;
        ingredients_text_with_allergens_it?: string;
        ingredients_that_may_be_from_palm_oil_n?: number;
        ingredients_that_may_be_from_palm_oil_tags?: { [key: string]: unknown }[];
        ingredients_with_specified_percent_n?: number;
        ingredients_with_specified_percent_sum?: number;
        ingredients_with_unspecified_percent_n?: number;
        ingredients_with_unspecified_percent_sum?: number;
        interface_version_created?: string;
        interface_version_modified?: string;
        knowledge_panels?: components["schemas"]["panels"];
        known_ingredients_n?: number;
        labels?: string;
        labels_hierarchy?: string[];
        labels_lc?: string;
        labels_tags?: string[];
        lang?: string;
        lang_imported?: string;
        languages?: {
          "en:arabic"?: number;
          "en:english"?: number;
          "en:french"?: number;
          "en:german"?: number;
          "en:italian"?: number;
          "en:spanish"?: number;
        };
        languages_codes?: {
          ar?: number;
          de?: number;
          en?: number;
          es?: number;
          fr?: number;
          it?: number;
        };
        languages_hierarchy?: string[];
        languages_tags?: string[];
        last_check_dates_tags?: string[];
        last_checked_t?: number;
        last_checker?: string;
        last_edit_dates_tags?: string[];
        last_editor?: string;
        last_image_dates_tags?: string[];
        last_image_t?: number;
        last_modified_by?: string;
        /** Date when the product page was last modified. */
        last_modified_t?: number;
        lc?: string;
        lc_imported?: string;
        link?: string;
        main_countries_tags?: { [key: string]: unknown }[];
        /** Places where the product was manufactured or transformed. */
        manufacturing_places?: string;
        manufacturing_places_tags?: { [key: string]: unknown }[];
        max_imgid?: string;
        minerals_prev_tags?: { [key: string]: unknown }[];
        minerals_tags?: { [key: string]: unknown }[];
        misc_tags?: string[];
        no_nutrition_data?: string;
        no_nutrition_data_imported?: string;
        nova_group?: number;
        nova_groups?: string;
        nova_groups_markers?: {
          "3"?: string[];
          "4"?: string[];
        };
        nova_groups_tags?: string[];
        nucleotides_prev_tags?: { [key: string]: unknown }[];
        nucleotides_tags?: { [key: string]: unknown }[];
        nutrient_levels?: {
          fat?: string;
          salt?: string;
          "saturated-fat"?: string;
          sugars?: string;
        };
        nutrient_levels_tags?: string[];
        nutriments?: {
          alcohol?: number;
          alcohol_100g?: number;
          alcohol_serving?: number;
          alcohol_unit?: string;
          alcohol_value?: number;
          carbohydrates?: number;
          carbohydrates_100g?: number;
          carbohydrates_serving?: number;
          carbohydrates_unit?: string;
          carbohydrates_value?: number;
          "carbon-footprint-from-known-ingredients_product"?: number;
          "carbon-footprint-from-known-ingredients_serving"?: number;
          energy?: number;
          "energy-kcal"?: number;
          "energy-kcal_100g"?: number;
          "energy-kcal_serving"?: number;
          /**
           * The unit used in the field energy-kcal_unit
           * (example in JSON: “energy_unit”: “kcal”).
           * The only possible value is “kcal.”'
           */
          "energy-kcal_unit"?: string;
          /**
           * The standardized value of a serving of 100g
           * (or 100ml for liquids) for energy expressed in kcal.
           */
          "energy-kcal_value"?: number;
          "energy-kj"?: number;
          "energy-kj_100g"?: number;
          "energy-kj_serving"?: number;
          "energy-kj_unit"?: string;
          "energy-kj_value"?: number;
          energy_100g?: number;
          energy_serving?: number;
          /**
           * The unit used in the energy_value field
           * (example in JSON: “energy_unit”: “kJ”).
           * Possible values are “kJ” or “kcal”.'
           */
          energy_unit?: string;
          /**
           * The standardized value of a serving of 100g
           * (or 100ml for liquids) for energy expressed in
           * the unit specified in the field energy_unit.
           */
          energy_value?: number;
          fat?: number;
          fat_100g?: number;
          fat_serving?: number;
          fat_unit?: string;
          fat_value?: number;
          "fruits-vegetables-nuts-estimate-from-ingredients_100g"?: number;
          "fruits-vegetables-nuts-estimate-from-ingredients_serving"?: number;
          "nova-group"?: number;
          "nova-group_100g"?: number;
          "nova-group_serving"?: number;
          "nutrition-score-fr"?: number;
          /**
           * Experimental nutrition score derived from
           * the UK FSA score and adapted for the French market
           * (formula defined by the team of Professor Hercberg).
           */
          "nutrition-score-fr_100g"?: number;
          proteins?: number;
          proteins_100g?: number;
          proteins_serving?: number;
          proteins_unit?: string;
          proteins_value?: number;
          salt?: number;
          salt_100g?: number;
          salt_serving?: number;
          salt_unit?: string;
          salt_value?: number;
          "saturated-fat"?: number;
          "saturated-fat_100g"?: number;
          "saturated-fat_serving"?: number;
          "saturated-fat_unit"?: string;
          "saturated-fat_value"?: number;
          sodium?: number;
          sodium_100g?: number;
          sodium_serving?: number;
          sodium_unit?: string;
          sodium_value?: number;
          sugars?: number;
          sugars_100g?: number;
          sugars_serving?: number;
          sugars_unit?: string;
          sugars_value?: number;
        };
        nutriscore_data?: {
          energy?: number;
          energy_points?: number;
          energy_value?: number;
          fiber?: number;
          fiber_points?: number;
          fiber_value?: number;
          fruits_vegetables_nuts_colza_walnut_olive_oils?: number;
          fruits_vegetables_nuts_colza_walnut_olive_oils_points?: number;
          fruits_vegetables_nuts_colza_walnut_olive_oils_value?: number;
          grade?: string;
          is_beverage?: number;
          is_cheese?: number;
          is_fat?: number;
          is_water?: number;
          negative_points?: number;
          positive_points?: number;
          proteins?: number;
          proteins_points?: number;
          proteins_value?: number;
          saturated_fat?: number;
          saturated_fat_points?: number;
          saturated_fat_ratio?: number;
          saturated_fat_ratio_points?: number;
          saturated_fat_ratio_value?: number;
          saturated_fat_value?: number;
          score?: number;
          sodium?: number;
          sodium_points?: number;
          sodium_value?: number;
          sugars?: number;
          sugars_points?: number;
          sugars_value?: number;
        };
        nutriscore_grade?: string;
        nutriscore_score?: number;
        nutriscore_score_opposite?: number;
        nutrition_data?: string;
        nutrition_data_per?: string;
        nutrition_data_per_imported?: string;
        nutrition_data_prepared?: string;
        nutrition_data_prepared_per?: string;
        /**
         * Nutrition grade (‘a’ to ‘e’),
         * https://world.openfoodfacts.org/nutriscore.
         */
        nutrition_grade_fr?: string;
        nutrition_grades?: string;
        nutrition_grades_tags?: string[];
        nutrition_score_beverage?: number;
        nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients?: number;
        nutrition_score_warning_fruits_vegetables_nuts_estimate_from_ingredients_value?: number;
        nutrition_score_warning_no_fiber?: number;
        obsolete?: string;
        obsolete_imported?: string;
        obsolete_since_date?: string;
        origin?: string;
        /**
         * This can be returned in many other languages
         * like origin_fr (for french).
         */
        origin_en?: string;
        /** Origins of ingredients */
        origins?: string;
        origins_hierarchy?: { [key: string]: unknown }[];
        origins_lc?: string;
        origins_tags?: { [key: string]: unknown }[];
        other_nutritional_substances_tags?: { [key: string]: unknown }[];
        owner?: string;
        owner_fields?: {
          abbreviated_product_name_fr?: number;
          allergens?: number;
          brands?: number;
          carbohydrates?: number;
          conservation_conditions_fr?: number;
          countries?: number;
          customer_service_fr?: number;
          data_sources?: number;
          energy?: number;
          "energy-kcal"?: number;
          "energy-kj"?: number;
          fat?: number;
          generic_name_fr?: number;
          ingredients_text_fr?: number;
          lang?: number;
          lc?: number;
          no_nutrition_data?: number;
          nutrition_data_per?: number;
          obsolete?: number;
          owner?: number;
          /** shape, material. */
          packaging?: string;
          producer_version_id?: number;
          product_name_fr?: number;
          proteins?: number;
          quantity?: number;
          salt?: number;
          "saturated-fat"?: number;
          serving_size?: number;
          sugars?: number;
        };
        owner_imported?: string;
        owners_tags?: string;
        packaging?: string;
        packaging_hierarchy?: string[];
        packaging_imported?: string;
        packaging_lc?: string;
        packaging_tags?: string[];
        /**
         * Recycling instructions as raw text, e.g. Plastic
         * bottle to recycle, Plastic cap to recycle.
         * This will get automatically parsed and
         * will be used to compute the Eco-Score.
         * You can either request it (if it exists) or
         * send it in a specific language.
         */
        packaging_text?: string;
        /**
         * This can be returned in many other languages
         * like packaging_text_fr (for french).
         */
        packaging_text_en?: string;
        packagings?: components["schemas"]["packagings"];
        packagings_complete?: components["schemas"]["packagings_complete"];
        photographers_tags?: string[];
        pnns_groups_1?: string;
        pnns_groups_1_tags?: string[];
        pnns_groups_2?: string;
        pnns_groups_2_tags?: string[];
        popularity_key?: number;
        popularity_tags?: string[];
        producer_version_id?: string;
        producer_version_id_imported?: string;
        /** The name of the product */
        product_name?: string;
        /**
         * The name of the product can also
         * be in many other languages like
         * product_name_fr (for french).
         */
        product_name_en?: string;
        product_quantity?: string;
        /** Country, state, or city where the product can be purchased. */
        purchase_places?: string;
        purchase_places_tags?: string[];
        /** Quantity and Unit. */
        quantity?: string;
        quantity_imported?: string;
        removed_countries_tags?: { [key: string]: unknown }[];
        rev?: number;
        scans_n?: number;
        scores?: { [key: string]: unknown };
        selected_images?: {
          front?: {
            display?: {
              en?: string;
              es?: string;
              fr?: string;
              it?: string;
            };
            small?: {
              en?: string;
              es?: string;
              fr?: string;
              it?: string;
            };
            thumb?: {
              en?: string;
              es?: string;
              fr?: string;
              it?: string;
            };
          };
          ingredients?: {
            display?: {
              es?: string;
              fr?: string;
            };
            small?: {
              es?: string;
              fr?: string;
            };
            thumb?: {
              es?: string;
              fr?: string;
            };
          };
          nutrition?: {
            display?: {
              en?: string;
              es?: string;
              fr?: string;
            };
            small?: {
              en?: string;
              es?: string;
              fr?: string;
            };
            thumb?: {
              en?: string;
              es?: string;
              fr?: string;
            };
          };
          packaging?: {
            display?: {
              fr?: string;
            };
            small?: {
              fr?: string;
            };
            thumb?: {
              fr?: string;
            };
          };
        };
        serving_quantity?: string;
        /** Serving size in g (or ml). */
        serving_size?: string;
        serving_size_imported?: string;
        sortkey?: number;
        sources?: {
          fields?: string[];
          id?: string;
          images?: { [key: string]: unknown }[];
          import_t?: number;
          manufacturer?: unknown;
          name?: string;
          source_licence?: string;
          source_licence_url?: string;
          url?: unknown;
        }[];
        sources_fields?: {
          "org-gs1"?: {
            gln?: string;
            gpcCategoryCode?: string;
            gpcCategoryName?: string;
            isAllergenRelevantDataProvided?: string;
            lastChangeDateTime?: string;
            partyName?: string;
            productionVariantDescription?: string;
            publicationDateTime?: string;
          };
        };
        states?: string;
        states_hierarchy?: string[];
        states_tags?: string[];
        /** Distributor name. */
        stores?: string;
        stores_tags?: string[];
        teams?: string;
        teams_tags?: string[];
        /**
         * List of substances that might cause allergies
         * that are present in trace amounts in the product
         * (this does not include the ingredients, as they
         * are not only present in trace amounts).
         * It is taxonomized with the allergens taxonomy.
         */
        traces?: string;
        traces_from_ingredients?: string;
        traces_from_user?: string;
        traces_hierarchy?: { [key: string]: unknown }[];
        traces_lc?: string;
        traces_tags?: { [key: string]: unknown }[];
        unique_scans_n?: number;
        unknown_ingredients_n?: number;
        unknown_nutrients_tags?: { [key: string]: unknown }[];
        update_key?: string;
        vitamins_prev_tags?: { [key: string]: unknown }[];
        vitamins_tags?: { [key: string]: unknown }[];
      };
      get_product_by_barcode: components["schemas"]["get_product_by_barcode_base"] & {
        product?: components["schemas"]["product"];
      };
      add_photo_to_existing_product: {
        /** Barcode of the product */
        code: string;
        /**
         * Indicates the type of the image and the corresponding language.
         * Image types can be front, ingredients, nutrition, packaging, other.
         * The language will be respresented by a 2-letter code.
         */
        imagefield: string;
        /**
         * The format and extension must be one of
         * gif|jpeg|jpg|png|heic.
         * This field is dynamic and dependent on the value of
         * imagefield in the request body. It wil be
         * imgupload_the value of the imagefield stated earlier.
         */
        imgupload_front_en: string;
      };
      "add_photo_to_existing_product-2": {
        files?: {
          url?: string;
          filename?: string;
          name?: string;
          thumbnailUrl?: string;
          code?: string;
        }[];
        image?: {
          thumb_url?: string;
          imgid?: number;
          crop_url?: string;
        };
        imgid?: number;
        status?: string;
        imagefield?: string;
        code?: string;
      };
      ocr_on_product: {
        status?: number;
      };
      rotate_a_photo: {
        status?: string;
        imagefield?: string;
        image?: {
          display_url?: string;
        };
      };
      crop_a_photo: {
        /** Barcode of the product. */
        code?: string;
        imgid?: number;
        id?: string;
        x1?: number;
        y1?: number;
        x2?: number;
        y2?: number;
      };
      add_or_edit_a_product: {
        /** The barcode of the product to be added or edited */
        code: string;
        /** A valid username. */
        user_id: string;
        /** A valid corresponding password. */
        password: string;
        /** The brands of the product (comma separated list of values). */
        brands?: string[];
        /** The labels of the product (comma separated list of values). */
        labels?: string[];
        /** The categories of the product (comma separated list of values). */
        categories?: string[];
        /**
         * Packaging type, format, material.
         * The [v3 API documentation](https://openfoodfacts.github.io/openfoodfacts-server/reference/api-v3/#operation/post-api-v3-product-barcode)
         * has a more structured data for `packaging`.
         */
        packaging?: string;
      };
      "add_or_edit_a_product-2": {
        status_verbose?: string;
        status?: number;
      };
      search_for_products: {
        count?: number;
        page?: number;
        page_count?: number;
        page_size?: number;
        products?: components["schemas"]["product"][];
        skip?: number;
      };
    };
    parameters: {
      id: string;
      /** Barcode of the product */
      code: string;
      process_image: string;
      ocr_engine: string;
      imgid: string;
      angle: string;
      /**
       * The allowed values  used to sort/order the search results.
       *
       * * `product_name` sorts on name
       * * `ecoscore_score`, `nova_score`, `nutriscore_score` rank on the [Eco-Score](https://world.openfoodfacts.org/eco-score-the-environmental-impact-of-food-products), [Nova](https://world.openfoodfacts.org/nova), or [Nutri-Score](https://world.openfoodfacts.org/nutriscore)
       * * `scans_n`, `unique_scans_n` and `popularity_key` are about product popularity: number of scans on unique scans, rank of product
       * * `created_t`, `last_modified_t`, are about creation and modification dates
       * * `nothing`, tells not to sort at all (because if you do not provide the sort_by argument we default to sorting on popularity (for food) or last modification date)
       */
      sort_by:
        | "product_name"
        | "last_modified_t"
        | "scans_n"
        | "unique_scans_n"
        | "created_t"
        | "completeness"
        | "popularity_key"
        | "nutriscore_score"
        | "nova_score"
        | "nothing"
        | "ecoscore_score";
      /**
       * The fields to be returned from the product object can also be limited.
       * If not specified, it returns the entire product object response.
       */
      fields: string;
      tagtype: string;
      term: string;
      /**
       * The additives_tags in english of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/additives) has a list of possible values for `additives`.
       */
      additives_tags: string;
      /**
       * The allergens_tags in english of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/allergens) has a list of possible values for `allergens`.
       */
      allergens_tags: string;
      /**
       * The brands_tags of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/brands) has a list of possible values for `brands`.
       */
      brands_tags: string;
      /**
       * The category of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/categories) has a list of possible values for `categories`.
       */
      categories_tags: string;
      /**
       * The countries_tags_en of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/countries) shows a list of possible values for `countries`.
       */
      countries_tags: string;
      /** The emb_codes_tags of product(s) you are searching for. */
      emb_codes_tags: string;
      /**
       * The labels_tags in english of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/labels) has a list of possible values for `labels`.
       */
      labels_tags: string;
      /**
       * The manufacturing_places_tags of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/manufacturing-places) has a list of possible values for `manufacturing-places`.
       */
      manufacturing_places_tags: string;
      /**
       * The nutrition_grades_tags of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/nutrition-grades) has a list of possible values for `nutrition-grades`.
       */
      nutrition_grades_tags: string;
      /** The origins_tags of product(s) you are searching for. */
      origins_tags: string;
      /**
       * The packaging_tag in german of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/packaging) has a list of possible values for `packaging`.
       */
      packaging_tags: string;
      /** The purchase_places_tags of product(s) you are searching for. */
      purchase_places_tags: string;
      /**
       * The states_tags in english of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/states) has a list of possible values for `states`.
       */
      states_tags: string;
      /** The stores_tags of product(s) you are searching for. */
      stores_tags: string;
      /**
       * The traces_tags of product(s) you are searching for.
       * The [OFF App](https://world.openfoodfacts.org/traces) shows a list of possible values for `traces`.
       */
      traces_tags: string;
      /** You can add a language code to a specific tag to query it in a specific language */
      tag_name_with_language_code: unknown;
    };
  }
  
  export interface operations {
    /**
     * A product can be fetched via its unique barcode.
     * It returns all the details of that product response.
     */
    "get-product-by-barcode": {
      parameters: {
        path: {
          /** The barcode of the product to be fetched */
          barcode: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["get_product_by_barcode"];
          };
        };
      };
    };
    /**
     * Knowledge panels gives high leve informations about a product,
     * ready to display.
     * This is used by open food facts website,
     * and by the official mobile application
     */
    "get-product-by-barcode-knowledge-panels": {
      parameters: {
        path: {
          /** The barcode of the product to be fetched */
          barcode: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["get_product_by_barcode_base"] & {
              product?: {
                knowledge_panels?: components["schemas"]["panels"];
              };
            };
          };
        };
      };
    };
    /**
     * Photos are source and proof of data.
     * The first photo uploaded for a product is
     * auto-selected as the product’s “front” photo.'
     */
    "get-cgi-product_image_upload.pl": {
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["add_photo_to_existing_product-2"];
          };
        };
      };
      requestBody: {
        content: {
          "multipart/form-data": components["schemas"]["add_photo_to_existing_product"];
        };
      };
    };
    /** Open Food Facts uses optical character recognition (OCR) to retrieve nutritional data and other information from the product labels. */
    "get-cgi-ingredients.pl": {
      parameters: {
        query: {
          id: components["parameters"]["id"];
          /** Barcode of the product */
          code: components["parameters"]["code"];
          process_image: components["parameters"]["process_image"];
          ocr_engine: components["parameters"]["ocr_engine"];
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["ocr_on_product"];
          };
        };
      };
    };
    /**
     * Although we recommend rotating photos manually and uploading a new version of the image,
     * the OFF API allows you to make api calls to automate this process.
     * You can rotate existing photos by setting the angle to 90º, 180º, or 270º clockwise.
     */
    "get-cgi-product_image_crop.pl": {
      parameters: {
        query: {
          /** Barcode of the product */
          code: components["parameters"]["code"];
          id: components["parameters"]["id"];
          imgid: components["parameters"]["imgid"];
          angle: components["parameters"]["angle"];
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["rotate_a_photo"];
          };
        };
      };
    };
    /**
     * Cropping is only relevant for editing existing products.
     * You cannot crop an image the first time you upload it to the system.
     */
    "post-cgi-product_image_crop.pl": {
      parameters: {};
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": { [key: string]: unknown };
          };
        };
      };
      requestBody: {
        content: {
          "multipart/form-data": components["schemas"]["crop_a_photo"];
        };
      };
    };
    /**
     * If the barcode exists then you will be editing the existing product,
     * However if it doesn''t you will be creating a new product with that unique barcode,
     * and adding properties to the product.
     */
    "post-cgi-product_jqm2.pl": {
      parameters: {};
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["add_or_edit_a_product-2"];
          };
        };
      };
      requestBody: {
        content: {
          "multipart/form-data": components["schemas"]["add_or_edit_a_product"];
        };
      };
    };
    /**
     * Search request allows you to get the nutritional data of products that match your search criteria.
     * It allows you create many custom APIs for your use case.
     * If the search query parameter has 2 possible values, they are seperated by a comma(,).
     * When filtering via a parameter that has different language codes like `fr`, `de` or `en`, specify the language code in the parameter name e.g `categories_tags_en`
     */
    "get-search": {
      parameters: {
        query: {
          /**
           * The additives_tags in english of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/additives) has a list of possible values for `additives`.
           */
          additives_tags?: components["parameters"]["additives_tags"];
          /**
           * The allergens_tags in english of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/allergens) has a list of possible values for `allergens`.
           */
          allergens_tags?: components["parameters"]["allergens_tags"];
          /**
           * The brands_tags of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/brands) has a list of possible values for `brands`.
           */
          brands_tags?: components["parameters"]["brands_tags"];
          /**
           * The category of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/categories) has a list of possible values for `categories`.
           */
          categories_tags?: components["parameters"]["categories_tags"];
          /**
           * The countries_tags_en of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/countries) shows a list of possible values for `countries`.
           */
          countries_tags_en?: components["parameters"]["countries_tags"];
          /** The emb_codes_tags of product(s) you are searching for. */
          emb_codes_tags?: components["parameters"]["emb_codes_tags"];
          /**
           * The labels_tags in english of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/labels) has a list of possible values for `labels`.
           */
          labels_tags?: components["parameters"]["labels_tags"];
          /**
           * The manufacturing_places_tags of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/manufacturing-places) has a list of possible values for `manufacturing-places`.
           */
          manufacturing_places_tags?: components["parameters"]["manufacturing_places_tags"];
          /**
           * The nutrition_grades_tags of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/nutrition-grades) has a list of possible values for `nutrition-grades`.
           */
          nutrition_grades_tags?: components["parameters"]["nutrition_grades_tags"];
          /** The origins_tags of product(s) you are searching for. */
          origins_tags?: components["parameters"]["origins_tags"];
          /**
           * The packaging_tag in german of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/packaging) has a list of possible values for `packaging`.
           */
          packaging_tags_de?: components["parameters"]["packaging_tags"];
          /** The purchase_places_tags of product(s) you are searching for. */
          purchase_places_tags?: components["parameters"]["purchase_places_tags"];
          /**
           * The states_tags in english of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/states) has a list of possible values for `states`.
           */
          states_tags?: components["parameters"]["states_tags"];
          /** The stores_tags of product(s) you are searching for. */
          stores_tags?: components["parameters"]["stores_tags"];
          /**
           * The traces_tags of product(s) you are searching for.
           * The [OFF App](https://world.openfoodfacts.org/traces) shows a list of possible values for `traces`.
           */
          traces_tags?: components["parameters"]["traces_tags"];
          /** You can add a language code to a specific tag to query it in a specific language */
          tag_name_with_language_code?: components["parameters"]["tag_name_with_language_code"];
          /**
           * The fields to be returned from the product object can also be limited.
           * If not specified, it returns the entire product object response.
           */
          fields?: components["parameters"]["fields"];
          /**
           * The allowed values  used to sort/order the search results.
           *
           * * `product_name` sorts on name
           * * `ecoscore_score`, `nova_score`, `nutriscore_score` rank on the [Eco-Score](https://world.openfoodfacts.org/eco-score-the-environmental-impact-of-food-products), [Nova](https://world.openfoodfacts.org/nova), or [Nutri-Score](https://world.openfoodfacts.org/nutriscore)
           * * `scans_n`, `unique_scans_n` and `popularity_key` are about product popularity: number of scans on unique scans, rank of product
           * * `created_t`, `last_modified_t`, are about creation and modification dates
           * * `nothing`, tells not to sort at all (because if you do not provide the sort_by argument we default to sorting on popularity (for food) or last modification date)
           */
          sort_by?: components["parameters"]["sort_by"];
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": components["schemas"]["search_for_products"];
          };
        };
      };
    };
    /**
     * For example , Dave is looking for packaging_shapes that contain the term "fe",
     * all packaging_shapes containing "fe" will be returned.
     * This is useful if you have a search in your application,
     * for a specific product field.
     */
    "get-cgi-suggest.pl": {
      parameters: {
        query: {
          tagtype?: components["parameters"]["tagtype"];
          term?: components["parameters"]["term"];
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": unknown[];
          };
        };
      };
    };
    /** Images ensure the reliability of Open Food Facts data. It provides a primary source and proof of all the structured data. You may therefore want to display it along the structured information. */
    "get-api-v2-product-barcode-?fields=images": {
      parameters: {
        path: {
          barcode: string;
        };
      };
      responses: {
        /** OK */
        200: {
          content: {
            "application/json": {
              code?: string;
              product?: {
                images?: { [key: string]: unknown };
              };
              status?: number;
              status_verbose?: string;
            };
          };
        };
      };
    };
  }
  
  export interface external {}
  